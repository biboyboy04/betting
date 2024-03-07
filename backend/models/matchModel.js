import db from '../config/db.js';
class Match {
    static add(game_id, team1_id, team2_id, match_date_time) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO game_match ( game_id, team1_id, team2_id, match_date_time) VALUES (?, ?, ?, ?)',
                [game_id, team1_id, team2_id, match_date_time],
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

    static addMany(matches) {
        // matches data format doenst match withe the data format of db
        // so there's a need to transform the data format from [{}, {}] to [[], []]
        const matchesArray = matches.map((match) => {
            return [match.game_id, match.team1_id, match.team2_id, match.match_date_time]
        })
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO game_match ( game_id, team1_id, team2_id, match_date_time) VALUES ?', [matchesArray], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
    }

    static getAll() {
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

    static getAllId() {
        return new Promise((resolve, reject) => {
            db.query('SELECT match_id from game_match', (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }

    static getAllPendingMatchId() {
        return new Promise((resolve, reject) => {
            db.query('SELECT match_id from game_match WHERE winner_id IS NULL', (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }

    // This is to handle defects when adding odds and payout to the matches
    // that are not pending and withouth or incomplete bets e.g(only one team has a bet)

    // Odds need to have both team1 and team2 total bets to calculate. It will fail if either doesnt have a bet
    // Payout needs Odds to pay the player
    
    // This is to ensure that we are getting matches that are pending and with a complete bet(both team1 and team 2)
    static getAllPendingMatchWithBets() {
        return new Promise((resolve, reject) => {
            let query = 
            `SELECT gm.match_id
            FROM game_match gm
            JOIN bet b ON gm.match_id = b.match_id
            WHERE gm.winner_id IS NULL
            GROUP BY gm.match_id
            HAVING COUNT(DISTINCT b.bet_on_team_id) = 2`
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }

    static getById(match_id) {
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

    static getTeamsByMatchId(match_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT team1_id, team2_id FROM game_match WHERE match_id = ?', [match_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    getByDateAndTime(match_date_time) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM game_match WHERE match_date_time = ?', [match_date_time], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
            );
        });
    }

    static getByGameId(game_id) {
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

    // refactor? add validation whether the winner_id is one of the participating team
    static setWinnerAllPendingMatches(match_id, winner_id) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE game_match SET winner_id = ? WHERE match_id = ?',
                [winner_id, match_id],
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

    static update(match_id, game_id, team1_id, team2_id, match_date_time, winner_id) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE game_match SET game_id = ?, team1_id = ?, team2_id = ?, match_date_time = ?, winner_id = ? WHERE match_id = ?',
                [game_id, team1_id, team2_id, match_date_time, winner_id, match_id],
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



    static delete(match_id) {
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