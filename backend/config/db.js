// import mysql from 'mysql';
import mysql2 from 'mysql2'

const db = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port:  process.env.DB_PORT,
    dateStrings: ['DATETIME', 'DATE'],
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})


db.getConnection((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
   
})


export default db;



