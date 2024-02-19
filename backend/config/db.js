import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: 'esports_betting',
})


db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
})


export default db;



