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
const PORT = 5555 || process.env.PORT; 

let app = express();
//refeactor: check if methods and credentials are working even if they are not used
app.use(cors({
    origin: process.env.APP_URL, 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));
// middlewares
// doublecheck these middlewares
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// refactor check if cookie are working even if they are not used
app.use(expressSession({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 *  60 * 24 * 1  // 1 day
    },
}));

// app.use(cookieParser('mySecretKey'));
app.use(express.json());

// passport middleware 
app.use(passport.initialize());

// access to req.session obj to persist data from serialzie and deserializes
// IIRC this attaches the user data cookie to the session
// add console.log to see if this is working
app.use(passport.session());

// this enables or attach 
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
app.use('/auth', authRoute)


app.listen(PORT, () => {
    console.log("Server Running here", PORT);
})
