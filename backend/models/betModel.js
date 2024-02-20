import db from '../config/db.js';
import playerModel from './playerModel.js';
import oddsModel from './oddsModel.js';

class Bet {
    //bet_id, player_id, match_id, amount, bet_on_team_id, bet_time
    static addBet(player_id, match_id, amount, bet_on_team_id, bet_time) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO bet (player_id, match_id, amount, bet_on_team_id, bet_time) VALUES (?, ?, ?, ?, ?)',
                [player_id, match_id, amount, bet_on_team_id, bet_time],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        playerModel.deductBalance(player_id, amount);
                        this.getMatchBets(match_id);
                        resolve(result);
                    }
                }
            );
        });
    }

    static getAllBet() {
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

    static getBetById(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM bet WHERE bet_id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getBetByPlayerId(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM bet WHERE player_id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getBetByMatchId(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM bet WHERE match_id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static updateBet(bet_id, player_id, match_id, amount, bet_on_team_id, bet_time) {
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

    static deleteBet(id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM bet WHERE bet_id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    //get how many bets placed on team 1 and team 2 and calculate odds and amount
    // REFACTOR: count can be removed?
    static getMatchBets(match_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT bet_on_team_id, COUNT(bet_on_team_id) as bet_count, SUM(amount) as total_amount FROM bet WHERE match_id = ? GROUP BY bet_on_team_id',
                [match_id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        // const newResult = result;
                        // const team1Total = newResult[0]["total_amount"]
                        // const team2Total = newResult[1]["total_amount"]

                        // // Calculate odds round to 2 decimal places
                        // const team1Odds = 1 / (1 - (team1Total / (team1Total + team2Total)))
                        // const team2Odds = 1 / (1 - (team2Total / (team2Total + team1Total)))

                        // // Add odds to data
                        // newResult[0]["odds"] = Math.round(team1Odds * 100) / 100
                        // newResult[1]["odds"] = Math.round(team2Odds * 100) / 100

                        // // store the odds to the odds table
                        // oddsModel.addOdds(match_id, newResult[0]["odds"], newResult[1]["odds"]);

                        // resolve(newResult);
                        resolve(result);

                    }
                }
            );
        });
    }
    // paybet = update the table where bet id then  
    // Player  Table where player id is 
    static payBet(match_id, winner_id) {
        return new Promise((resolve, reject) => {
            db.query("UPDATE player p JOIN bet b ON p.PlayerID = b.PlayerID JOIN match m ON b.MatchID = m.MatchID SET p.Balance = p.Balance + (CASE WHEN b.BetOnTeamID = m.WinnerID THEN b.Amount ELSE -b.Amount END) WHERE m.MatchID = '?' AND m.WinnerID = '?", [match_id, winner_id], (err, result) => {
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
