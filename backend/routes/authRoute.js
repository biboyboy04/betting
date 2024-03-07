import express from 'express';
import passport from 'passport';

const authRoute = express.Router();

// each auth route automatically gets the sent user and pass details 


authRoute.post('/employee/login', (req, res, next) => {
    passport.authenticate('employee', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: "Login successful", user: user });
        });
    })(req, res, next);
});

authRoute.post('/player/login', (req, res, next) => {
    passport.authenticate('player', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: "Login successful", user: user });
        });
    })(req, res, next);
});



export default authRoute;