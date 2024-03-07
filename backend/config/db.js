import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "password",
    database: 'esports_betting',
    port: 4306
})


db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
})


export default db;



