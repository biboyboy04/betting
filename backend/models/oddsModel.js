import db from '../config/db.js';

class Odds {
    /*
    static getMatchBets(match_id) {
            return new Promise((resolve, reject) => {
                db.query('SELECT bet_on_team_id, COUNT(bet_on_team_id) as bet_count, SUM(amount) as total_amount FROM bet WHERE match_id = ? GROUP BY bet_on_team_id',
                    [match_id],
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            const newResult = result;
                            const team1Total = newResult[0]["total_amount"]
                            const team2Total = newResult[1]["total_amount"]
    
                            // Calculate odds round to 2 decimal places
                            const team1Odds = 1 / (1 - (team1Total / (team1Total + team2Total)))
                            const team2Odds = 1 / (1 - (team2Total / (team2Total + team1Total)))
    
                            // Add odds to data
                            newResult[0]["odds"] = Math.round(team1Odds * 100) / 100
                            newResult[1]["odds"] = Math.round(team2Odds * 100) / 100
    
                            // store the odds to the odds table
                            oddsModel.addOdds(match_id, newResult[0]["odds"], newResult[1]["odds"]);
    
                            resolve(newResult);
    
                        }
                    }
                );
            });
        }
    */

    // calcualte odds
    static addOdds(match_id, team1_odds, team2_odds) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO odds (match_id, team1_odds, team2_odds) VALUES (?, ?, ?)',
                [match_id, team1_odds, team2_odds],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve('Odds added successfully');
                    }
                }
            );
        });
    }

    static getAllOdds() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM odds', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Odds retrieved successfully');
                }
            });
        });
    }

    static getOddsById(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM odds WHERE odds_id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Odds retrieved successfully');
                }
            });
        });
    }

    static getOddsByMatchId(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM odds WHERE match_id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Odds retrieved successfully');
                }
            });
        });
    }

}
export default Odds;