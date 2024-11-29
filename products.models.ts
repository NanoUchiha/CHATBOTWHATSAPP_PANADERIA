import poolConfig from 'src/config';

//Hacemos una tipo simulacion de la tabla para recorrer las propiedades de la BD.
interface Producto {
    Nombre: string;
    Precio: number;
    Stock: number;
}

export async function ObtenerProductosIA(): Promise<Producto[]> {
    const [rows]: any = await poolConfig.query("SELECT Nombre, Precio, Stock FROM productos");
    return rows;
}

export default {
    ObtenerProductosIA
};




