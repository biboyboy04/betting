import db from '../config/db.js';
import bcrypt from 'bcrypt';

class Player {
    static add(username, password, email, first_name, last_name, date_of_birth, nationality, balance = 0) {
        return new Promise((resolve, reject) => {
            // check if username already exist before adding to db
            this.getByUsername(username).then((result) => {
                if (result.length > 0) {
                    reject('Username already exist');
                } else {
                    const hashed_password = bcrypt.hashSync(password, 10);
                    db.query('INSERT INTO player (username, password, email, first_name, last_name, date_of_birth, nationality, balance) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                        [username, hashed_password, email, first_name, last_name, date_of_birth, nationality, balance]
                        , (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }

    static addMany(players) {
        return new Promise((resolve, reject) => {
            // for each player, hash the password before adding to db
            const values = players.map(player => {
                // refactor? do we need to use destructuring or just use player.username, etc?
                const { username, password, email, first_name, last_name, date_of_birth, nationality, balance } = player;
                const hashed_password = bcrypt.hashSync(password, 10);
                return [username, hashed_password, email, first_name, last_name, date_of_birth, nationality, balance];
            });
            console.log(values);

            db.query('INSERT INTO player (username, password, email, first_name, last_name, date_of_birth, nationality, balance) VALUES ?', [values], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }


    static getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM player', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getAllId() {
        return new Promise((resolve, reject) => {
            db.query('SELECT player_id from player', (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }

    static getById(player_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM player WHERE player_id = ?', [player_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getByUsername(username) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM player WHERE username = ?', [username], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static update(player_id, username, password, email, first_name, last_name, date_of_birth, nationality, balance = 0) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE player SET username = ?, password = ?, email = ?, first_name = ?, last_name = ?, date_of_birth = ?, nationality = ?, balance = ? WHERE player_id = ?',
                [username, password, email, first_name, last_name, date_of_birth, nationality, balance, player_id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    static delete(player_id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM player WHERE player_id = ?', [player_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static addBalance(player_id, amount) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE player SET balance = balance + ? WHERE player_id = ?',
                [amount, player_id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

    static deductBalance(player_id, amount) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE player SET balance = balance - ? WHERE player_id = ?',
                [amount, player_id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }
}

export default Player;