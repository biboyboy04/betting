import db from '../config/db.js';
//match_id, game_id, team1_id, team2_id, match_date, match_time, winning_id
class Match {
    static addMatch(game_id, team1_id, team2_id, match_date, match_time, winning_id) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO game_match ( game_id, team1_id, team2_id, match_date, match_time, winning_id) VALUES (?, ?, ?, ?, ?, ?)',
                [game_id, team1_id, team2_id, match_date, match_time, winning_id],
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
    static getAllMatch() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM game_match', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    static getMatchById(match_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM game_match WHERE match_id = ?', [match_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    getMatchByDateAndTime(match_date, match_time) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM game_match WHERE match_date = ? AND match_time = ?', [match_date, match_time], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
            );
        });
    }

    static getMatchByGameId(game_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM game_match WHERE game_id = ?', [game_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
            );
        });
    }

    static updateMatch(match_id, game_id, team1_id, team2_id, match_date, match_time, winning_id) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE game_match SET game_id = ?, team1_id = ?, team2_id = ?, match_date = ?, match_time = ?, winning_id = ? WHERE match_id = ?',
                [game_id, team1_id, team2_id, match_date, match_time, winning_id, match_id],
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

    static deleteMatch(match_id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM game_match WHERE match_id = ?', [match_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}
export default Match;