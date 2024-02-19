import db from '../config/db.js';

class Player {
    static addPlayer(username, password, email, firstName, lastName, dateOfBirth, nationality, balance) {
        return new Promise((resolve, reject) => {
            console.log(firstName, lastName)
            db.query('INSERT INTO player (username, password, email, first_name, last_name, date_of_birth, nationality, balance) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [username, password, email, firstName, lastName, dateOfBirth, nationality, balance],
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

    static getAllPlayer() {
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

    static getPlayerById(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM player WHERE player_id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static updatePlayer(id, username, password, email, firstName, lastName, dateOfBirth, nationality, balance) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE player SET username = ?, password = ?, email = ? first_name = ?, last_name = ?, date_of_birth = ?, nationality = ?, balance = ? WHERE player_id = ?',
                [username, password, email, firstName, lastName, dateOfBirth, nationality, balance, id],
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

    static deletePlayer(id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM player WHERE player_id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // add default balance 0
    static addBalance(id, amount) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE player SET balance = balance + ? WHERE player_id = ?',
                [amount, id],
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

    static deductBalance(id, amount) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE player SET balance = balance - ? WHERE player_id = ?',
                [amount, id],
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