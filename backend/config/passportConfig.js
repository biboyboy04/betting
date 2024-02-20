import db from "./db.js";
import bcrypt from "bcrypt";
import playerModel from "../models/playerModel.js";
import employeeModel from "../models/employeeModel.js";
import { Strategy as localStrategy } from "passport-local";

export default (passport) => {
    passport.use('player', new localStrategy((username, password, done) => {
        db.query('SELECT * FROM player WHERE username = ?', [username], (err, result) => {
            if (err) {
                return done(err);
            }
            if (!result) {
                return done(null, false, { message: 'Incorrect username' });
            }
            if (!bcrypt.compareSync(password, result[0].password)) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, result[0]);
        });

    }));

    passport.use('employee', new localStrategy((username, password, done) => {
        db.query('SELECT * FROM employee WHERE username = ?', [username], (err, result) => {
            if (err) {
                return done(err);
            }
            if (!result) {
                return done(null, false, { message: 'Incorrect username' });
            }
            if (!bcrypt.compareSync(password, result[0].password)) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, result[0]);
        });

    }));

    passport.serializeUser((user, done) => {
        if (user.player_id) {
            done(null, { userType: "player", id: user.player_id });
        } else {
            done(null, { userType: "employee", id: user.employee_id });
        }
    });

    passport.deserializeUser((user, done) => {
        if (user.userType === "player") {
            playerModel.getPlayerById(user.id).then((result) => {
                done(null, result[0]);
            }).catch((err) => {
                done(err);
            });
        }
        else {
            employeeModel.getEmployeeById(user.id).then((result) => {
                done(null, result[0]);
            }).catch((err) => {
                done(err);
            });
        }
    });
}