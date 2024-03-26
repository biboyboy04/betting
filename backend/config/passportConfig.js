import bcrypt from "bcrypt";
import { Strategy as localStrategy } from "passport-local";
import playerModel from "../models/playerModel.js";
import employeeModel from "../models/employeeModel.js";

export default (passport) => {
    passport.use('player', new localStrategy((username, password, done) => {
        playerModel.getByUsername(username).then((result) => {
            // the !result is not working as the return value is an empty array
            // so we need to check the length of the array
            if (result.length === 0) {
                return done(null, false, { message: 'Incorrect username' });
            }
            if (!bcrypt.compareSync(password, result[0].password)) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, result[0]);
        }).catch((err) => {
            return done(err);
        });
    }));

    passport.use('employee', new localStrategy((username, password, done) => {
        employeeModel.getByUsername(username).then((result) => {
            if (result.length === 0) {
                return done(null, false, { message: 'Incorrect username' });
            }
            if (!bcrypt.compareSync(password, result[0].password)) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, result[0]);
        }).catch((err) => {
            return done(err);
        }
        );
    }));

    // serialzie runs on login
    passport.serializeUser((user, done) => {
        if (user.player_id) {
            done(null, { userType: "player", id: user.player_id });
        } else {
            done(null, { userType: "employee", id: user.employee_id });
        }
    });

    //refactor: is it ok to add userType on deserialization
    // deserialize run on every current user requests
    passport.deserializeUser((user, done) => {
        if (user.userType === "player") {
            playerModel.getById(user.id).then((result) => {
                result[0].user_type = "player";
                done(null, result[0]);
            }).catch((err) => {
                done(err);
            });
        }
        else {
            employeeModel.getById(user.id).then((result) => {
                result[0].user_type = "employee";
                done(null, result[0]);
            }).catch((err) => {
                done(err);
            });
        }
    });
}