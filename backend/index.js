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
import transactionRoute from './routes/transactionRoute.js';
import oddsRoute from './routes/oddsRoute.js';
import generateRoute from './routes/generateRoute.js';

// refactor to env
const PORT = 5555;
let app = express();
//refeactor: check if methods and credentials are working even if they are not used
app.use(cors({
    origin: ['http://localhost:4200', "http://localhost:8100"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// refactor check if cookie are working even if they are not used
app.use(expressSession({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30000
    },
}));

app.use(cookieParser('mySecretKey'));
app.use(express.json());

// passport middleware 

app.use(passport.initialize());

// access to req.session obj to persist data from serialzie and deserializes
// IIRC this attaches the user data cookie to the session
// add console.log to see if this is working
app.use(passport.session());
initializePassport(passport);

// set routes
app.use('/employee', employeeRoute)
app.use('/player', playerRoute)
app.use('/game', gameRoute)
app.use('/team', teamRoute)
app.use('/match', matchRoute)
app.use('/bet', betRoute)
app.use('/transaction', transactionRoute)
app.use('/odds', oddsRoute)
app.use('/generate', generateRoute)
app.use('/', authRoute)


// Middleware to check if user is authenticated
// Add this
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "Unauthorized" });
}

// get the details of the logged in user
//refactor if need the error property
app.get('/getUser', (req, res) => {
    try {
        const loggedInUser = req.user;
        if (!loggedInUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user: loggedInUser });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while retrieving user information" });
    }
})
// refactor: do i need to put error handling for 404 
app.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
    });
    res.status(200).json({ message: "Logged out successfully" });
});

app.listen(PORT, () => {
    console.log("Server Running here", PORT);
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
