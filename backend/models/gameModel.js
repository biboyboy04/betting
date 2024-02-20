// game schema = {game_id, name,genre, description, platform}
import db from '../config/db.js';

class Game {
    static addGame(name, genre, description) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO game (name, genre, description) VALUES (?, ?, ?)',
                [name, genre, description],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Game added successfully');
                    }
                }
            );
        });
    }

    static getAllGame() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM game', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Games retrieved successfully');
                }
            });
        });
    }

    static getGameById(game_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM game WHERE game_id = ?', [game_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Game retrieved successfully');
                }
            });
        });
    }

    static updateGame(game_id, name, genre, description) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE game SET name = ?, genre = ?, description = ? WHERE game_id = ?',
                [name, genre, description, game_id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Game updated successfully');
                    }
                }
            );
        });
    }

    static deleteGame(game_id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM game WHERE game_id = ?', [game_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Game deleted successfully');
                }
            });
        });
    }

}
export default Game;