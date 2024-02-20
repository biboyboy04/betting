import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
import passport from 'passport';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';

import employeeRoute from './routes/employeeRoute.js';
import playerRoute from './routes/playerRoute.js';
import gameRoute from './routes/gameRoute.js';
import teamRoute from './routes/teamRoute.js';
import matchRoute from './routes/matchRoute.js';
import betRoute from './routes/betRoute.js';


const PORT = 5555;
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'mySecretKey', resave: false, saveUninitialized: false }));
app.use(cookieParser('mySecretKey'));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/employee', employeeRoute)
app.use('/player', playerRoute)
app.use('/game', gameRoute)
app.use('/team', teamRoute)
app.use('/match', matchRoute)
app.use('/bet', betRoute)


app.listen(PORT, () => {
    console.log("Running here", PORT);
})












// IF SCALE TO POOL

// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'localhost',
//     user: "root",
//     password: "",
//     database: 'test_db',
// })

// app.get('/', (req, res) => {
//     pool.getConnection((err, conn) => {
//         if (err) throw err
//         console.log("con id", conn.threadId)

//         conn.query('SELECT * from admin', (err, rows) => {
//             conn.release()
//             if (!err) {
//                 res.send(rows)
//             }
//             else {
//                 console.log(err)
//             }

//         })
//     })
// })