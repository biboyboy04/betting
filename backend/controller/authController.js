import passport from 'passport';
class AuthController {
    // each auth route automatically gets the sent user and pass details (investiage this again)
    // passport.authenticate = middleware
    //trace where next() goes

    // note: passport.authenticate runs another function in the passportConfig

    static authenticateEmployee(req, res, next) {
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
    }

    static authenticatePlayer(req, res, next) {
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
    }

    static getUser(req, res) {
        try {
            const user = req.user;
            console.log("getuser")
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({ user: user })
        } catch (error) {
            res.status(500).json({ message: "An error occurred while retrieving user information" })
        }
    }

    // investigate where next() goes
    static logout(req, res) {
        req.logout((err) => {
            if (err) { return next(err); }
        });
        res.status(200).json({ message: "Logged out successfully" })
    }

}

export default AuthController;