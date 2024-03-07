import db from '../config/db.js';
import playerModel from './playerModel.js';

class Bet {
    static add(player_id, match_id, amount, bet_on_team_id, bet_time) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO bet (player_id, match_id, amount, bet_on_team_id) VALUES (?, ?, ?, ?)',
                [player_id, match_id, amount, bet_on_team_id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        playerModel.deductBalance(player_id, amount);
                        resolve(result);
                    }
                }
            );
        });
    }

    static addMany(bets) {
        // bets data format doenst match withe the data format of db
        // so there's a need to transform the data format from [{}, {}] to [[], []]
        const betsArray = bets.map((bet) => {
            return [bet.player_id, bet.match_id, bet.amount, bet.bet_on_team_id]
        })
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO bet (player_id, match_id, amount, bet_on_team_id) VALUES ?', [betsArray], (err, result) => {
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
            db.query('SELECT * FROM bet', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getById(bet_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM bet WHERE bet_id = ?', [bet_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getByPlayerId(player_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM bet WHERE player_id = ?', [player_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getByMatchId(match_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM bet WHERE match_id = ?', [match_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static update(bet_id, player_id, match_id, amount, bet_on_team_id, bet_time) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE bet SET player_id = ?, match_id = ?, amount = ?, bet_on_team_id = ?, bet_time = ? WHERE bet_id = ?',
                [player_id, match_id, amount, bet_on_team_id, bet_time, bet_id],
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

    static delete(bet_id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM bet WHERE bet_id = ?', [bet_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    //get how many bets placed on team 1 and team 2 calc count and amount
    // REFACTOR: count can be removed?
    //refactor name to withouth bets?
    // refactor double check if reject is supposed to be an error
    static getTotalMatchBets(match_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT bet_on_team_id, COUNT(bet_on_team_id) as bet_count, SUM(amount) as total_amount FROM bet WHERE match_id = ? GROUP BY bet_on_team_id',
                [match_id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (!result) {
                            reject(new Error("No bets found for this match."))
                        }
                        else if (result.length < 1) {
                            reject(new Error("No bets found on other team for this match."))
                        }
                        else {
                            resolve(result);
                        }
                    }
                }
            );
        });
    }

    // bets here = bets on 2 sides
    static getMatchWithBets() {
        return new Promise((resolve, reject) => {
            db.query('SELECT match_id FROM bet GROUP BY match_id HAVING COUNT(DISTINCT bet_on_team_id) = 2;', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static payout(match_id, winner_id) {
        return new Promise((resolve, reject) => {
            // pay the player who bet on the match winner 
            // payout =  bet amount * odds
            // updates the player balance
            // update the bet table with the amount after the payout
            const sql = `
            UPDATE player p
            JOIN bet b ON p.player_id = b.player_id
            JOIN game_match m ON b.match_id = m.match_id
            JOIN odds o ON o.team_id = m.winner_id
            SET p.Balance = p.Balance + (b.amount * o.odds),
            b.amount_after = b.amount * o.odds
            WHERE m.match_id = ? 
            AND m.winner_id = ? 
            AND b.bet_on_team_id = m.winner_id;
          `;
            db.query(
                sql,
                [match_id, winner_id], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    }

}
export default Bet;
