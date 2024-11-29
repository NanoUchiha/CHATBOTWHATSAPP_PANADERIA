import poolconfig from 'src/config';

export interface Informacion{

    id_productos: number;
    NombreCliente: string;
    Telefono: string
    CantidadProductos: string

}

export async function GuardarInformacionCliente(info: Informacion): Promise<void> {

    const query = `
        INSERT INTO informacion (id_productos, NombreCliente, Telefono, CantidadProductos) 
        VALUES (?, ?, ?, ?)
    `;

    await poolconfig.query(query, [
        info.id_productos,
        info.NombreCliente,
        info.Telefono,
        info.CantidadProductos,
    ]);
}

export default {
    GuardarInformacionCliente,
};

