import db from '../config/db.js';

class Game {
    static add(name, genre, description) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO game (name, genre, description) VALUES (?, ?, ?)',
                [name, genre, description],
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

    static getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM game', (err, result) => {
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
            db.query('SELECT game_id from game', (err, result) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        });
    }

    static getById(game_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM game WHERE game_id = ?', [game_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static update(game_id, name, genre, description) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE game SET name = ?, genre = ?, description = ? WHERE game_id = ?',
                [name, genre, description, game_id],
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

    static delete(game_id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM game WHERE game_id = ?', [game_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}
export default Game;