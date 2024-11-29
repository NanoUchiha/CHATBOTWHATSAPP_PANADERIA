import mysql from 'mysql2/promise';

const poolConexion = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'arponero5345',
    database: 'bweb'
});

export default poolConexion;


