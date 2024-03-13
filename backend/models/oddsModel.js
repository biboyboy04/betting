import db from '../config/db.js';
import betModel from './betModel.js';
import matchModel from './matchModel.js';

class Odds {
    //refactor this add: pattern is not the same as others
    // must have parameters for maybe team1id and team2id, and odds?
    static async add(match_id) {
        try {
            const totalBets = await betModel.getTotalMatchBets(match_id);

            // if theres any team without bets, there's no way the other
            // team can win, as each betters gets their winnings from the losers

            // So, if either team doesn't have bets, then the odds are 1 (no winners)
            // pseudo refund
            if (totalBets.length < 2) {

                const team_ids = await matchModel.getTeamsByMatchId(match_id);

                const team1_id = team_ids[0]["team1_id"];
                const team2_id = team_ids[0]["team2_id"];

                //odds = 1 means that there are no bets on that team
                // 1 * their bet = pseudo refund
                const team1Odds = 1;
                const team2Odds = 1;

                await this.insertOdds(match_id, team1_id, team1Odds);
                await this.insertOdds(match_id, team2_id, team2Odds);
            }
            else {
                //refactor
                const team1Total = totalBets[0]?.total_amount || 1;
                const team2Total = totalBets[1]?.total_amount || 1;

                const team1Id = totalBets[0]?.bet_on_team_id;
                const team2Id = totalBets[1]?.bet_on_team_id;

                const [team1Odds, team2Odds] = this.calculateOdds(team1Total, team2Total);

                await this.insertOdds(match_id, team1Id, team1Odds);
                await this.insertOdds(match_id, team2Id, team2Odds);
            }

            return "Odds added successfully";
        } catch (error) {
            throw error;
        }
    }

    static insertOdds(match_id, team_id, odds) {
        return new Promise((resolve, reject) => {
            this.getByMatchAndTeamId(match_id, team_id).then((result) => {
                if (result.length > 0) {
                    db.query('UPDATE odds SET odds = ? WHERE match_id = ? AND team_id = ?', [odds, match_id, team_id], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    }
                    );
                }
                else {
                    db.query('INSERT INTO odds (match_id, team_id, odds) VALUES (?, ?, ?)', [match_id, team_id, odds], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                }
            })
        });
    }

    static calculateOdds(team1_total, team2_total) {

        let team1Odds = 1 / (1 - (team1_total / (team1_total + team2_total)))
        let team2Odds = 1 / (1 - (team2_total / (team2_total + team1_total)))

        // make odds to 2 decimal places
        team1Odds = Math.round(team1Odds * 100) / 100
        team2Odds = Math.round(team2Odds * 100) / 100

        return [team1Odds, team2Odds]
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM odds', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getById(odds_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM odds WHERE odds_id = ?', [odds_id], (err, result) => {
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
            db.query('SELECT * FROM odds WHERE match_id = ?', [match_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getByMatchAndTeamId(match_id, team_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM odds WHERE match_id = ? AND team_id = ?', [match_id, team_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static update(odds_id, match_id, team_id, odds) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE odds SET match_id = ?, team_id = ?, odds = ? WHERE odds_id = ?',
                [match_id, team_id, odds, odds_id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    }

    static delete(odds_id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM odds WHERE odds_id = ?', [odds_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }


}
export default Odds;
