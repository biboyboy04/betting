import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';
import initializePassport from "./config/passportConfig.js";

// import routes
import employeeRoute from './routes/employeeRoute.js';
import playerRoute from './routes/playerRoute.js';
import gameRoute from './routes/gameRoute.js';
import teamRoute from './routes/teamRoute.js';
import matchRoute from './routes/matchRoute.js';
import betRoute from './routes/betRoute.js';
import authRoute from './routes/authRoute.js';

// refactor to env
const PORT = 5555;
let app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'mySecretKey', resave: false, saveUninitialized: false }));
app.use(cookieParser('mySecretKey'));
app.use(express.json());

// passport middleware 
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

// set routes
app.use('/employee', employeeRoute)
app.use('/player', playerRoute)
app.use('/game', gameRoute)
app.use('/team', teamRoute)
app.use('/match', matchRoute)
app.use('/bet', betRoute)
app.use('/', authRoute)


// get the details of the logged in user
app.get('/getUser', (req, res) => {
    res.send(req.user);
})

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
