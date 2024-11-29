import BotWhatsapp from '@bot-whatsapp/bot';
import { ChatCompletionMessageParam } from 'openai/resources';
import { run } from 'src/service/openai';
import { ObtenerProductosIA } from 'src/models/products.models';
import { GuardarInformacionCliente } from 'src/models/informacion.models';

export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.WELCOME)
.addAction(async (ctx, { flowDynamic, state }) => {
    
    try {
        const productosIA = await ObtenerProductosIA();
        let mensajeBot = 'Los productos disponibles son los siguientes:\n';

        productosIA.forEach((producto) => {
            mensajeBot += `- ${producto.Nombre}:\n $${producto.Precio}`;
        });

        const newhistory = (state.getMyState()?.history ?? []) as ChatCompletionMessageParam[];
        const name = ctx?.pushName ?? '';

        newhistory.push({
            role: 'user',
            content: `${ctx.body}\n\n${mensajeBot}`
        });

        const RespuestaLarga = await run(name, newhistory);
        
        const chunks = RespuestaLarga.split(/(?<!\d)\.\s+/g);
        for (const chunk of chunks) {
            await flowDynamic(chunk);
        }

        newhistory.push({
            role: 'assistant',
            content: RespuestaLarga
        });

        const nombreRegex = /\b([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)+)\b/;
        const telefonoRegex = /\b(\d{10})\b/;   
        const producto_cliente_regex = /(\d+)\s*([a-záéíóúñ\s]+)/i;
    
        const nombreMatch = ctx.body.match(nombreRegex);
        const telefonoMatch = ctx.body.match(telefonoRegex);

        const nombreCliente = nombreMatch ? nombreMatch[1].trim() : "Nombre desconocido";
        const telefonoCliente = telefonoMatch ? telefonoMatch[1] : "Teléfono desconocido";

        const pedidoMatch = ctx.body.match(producto_cliente_regex);
        const nombreProducto = pedidoMatch ? pedidoMatch[2].trim() : "quiero 4 Birotes";

        if (!nombreMatch || !telefonoMatch) {
        } else {
            await GuardarInformacionCliente({
                id_productos: 1, 
                NombreCliente: nombreCliente,
                Telefono: telefonoCliente,
                CantidadProductos: nombreProducto,
            });
        }

        await state.update({ history: newhistory });
  
    } catch (error) {
        console.log(`[ERROR]:`, error);
        await flowDynamic("Hubo un error al procesar tu pedido, esto se resolverá pronto");
    }
});
