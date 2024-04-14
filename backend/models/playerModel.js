import db from '../config/db.js';
import bcrypt from 'bcrypt';
import transactionModel from './transactionModel.js';
import betModel from './betModel.js';
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

    static getAllPaginated(limit, offset) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM player LIMIT ? OFFSET ?', [limit, offset], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getTotal(){
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) as total FROM player', (err, result) => {
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

    static getBalance(player_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT balance FROM player WHERE player_id = ?', [player_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static update(player_id, username, email, first_name, last_name, date_of_birth, nationality, balance) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE player SET username = ?, email = ?, first_name = ?, last_name = ?, date_of_birth = ?, nationality = ?, balance = ? WHERE player_id = ?',
                [username, email, first_name, last_name, date_of_birth, nationality, balance, player_id],
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

    // refactor bqalance

    static async bet(player_id, amount) {
        try {
            const currentBalance = await this.getBalance(player_id);
            if (currentBalance[0].balance < amount) {
                throw new Error('Insufficient balance');
            }
            await new Promise((resolve, reject) => {
                db.query('UPDATE player SET balance = balance - ? WHERE player_id = ? AND balance >= (balance - ?)',
                    [amount, player_id, amount],
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    }
                );
            });

            const type = "bet";
            const playerBalance = await this.getBalance(player_id);
            const balance = playerBalance[0].balance;
            //refactor transaction model. Remove the logic here
            // for reference tranasction is here mainly because of the user balance
            await transactionModel.add(player_id, type, amount, balance);

            return "Bet successfully";
        } catch (error) {
            throw error;
        }
    }

    static async winBet (player_id, amount) {
        try {
            await new Promise((resolve, reject) => {
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
            const type = "win_bet";
            const playerBalance = await this.getBalance(player_id);
            const balance = playerBalance[0].balance;
            await transactionModel.add(player_id, type, amount, balance);

            return "Win successfully";
        } catch (error) {
            throw error;
        }
    }

    static async deposit(player_id, amount) {
        try {
            await new Promise((resolve, reject) => {
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
            const type = "deposit";
            const playerBalance = await this.getBalance(player_id);
            const balance = playerBalance[0].balance;
            await transactionModel.add(player_id, type, amount, balance);

            return "Deposited successfully";
        } catch (error) {
            throw error;
        }
    }

    static async withdraw(player_id, amount) {
        try {
            await new Promise((resolve, reject) => {
                db.query('UPDATE player SET balance = balance - ? WHERE player_id = ? AND balance >= ?',
                    [amount, player_id, amount],
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    }
                );
            });
            const type = "withdraw";
            const playerBalance = await this.getBalance(player_id);
            const balance = playerBalance[0].balance;
            await transactionModel.add(player_id, type, amount, balance);

            return "Withraw successfully";
        } catch (error) {
            throw error;
        }
    }
}

export default Player;