import db from '../config/db.js';
import gameModel from './gameModel.js';
import teamModel from './teamModel.js';
import oddsModel from './oddsModel.js';
import betModel from './betModel.js'

class Match {
    static async add(game_id, team1_id, team2_id, match_date_time) {
        try {
            const match = await new Promise((resolve, reject) => {
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
            let insertedMatchId = match.insertId;
            await oddsModel.add(insertedMatchId);
        } catch (error) {

        }
    }

    static async addMany(matches) {
        try {
            await Promise.all(matches.map(match => {
                const { game_id, team1_id, team2_id, match_date_time } = match;
                return this.add(game_id, team1_id, team2_id, match_date_time);
            }));
            return { message: "Matches added successfully" };
        } catch (error) {
            console.log(first)
            throw error;
        }
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

    static async getAllDetails() {
        try {
            const matchData = await new Promise((resolve, reject) => {
                db.query('SELECT * FROM game_match',
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    }
                );
            });

            const newMatchData = await Promise.all(matchData.map(async (match) => {
                const game = await gameModel.getById(match.game_id);
                const team1 = await teamModel.getById(match.team1_id);
                const team2 = await teamModel.getById(match.team2_id);
                const odds = await oddsModel.getByMatchId(match.match_id);

                match.game = game;
                match.team1 = team1;
                match.team2 = team2;
                match.odds = odds;

                return match; // Return the modified match object
            }));

            return newMatchData;

        } catch (error) {
            throw error;
        }
    }

    static async getAllDetailsPaginated(limit, offset) {
        let query = `
    SELECT
        gm.*,
        JSON_OBJECT('team_id', t1.team_id, 'name', t1.name ) as team2,
        JSON_OBJECT('team_id', t2.team_id, 'name', t2.name) as team1,
        JSON_OBJECT('game_id', g.game_id, 'name', g.name) as game,
        JSON_OBJECT(
            'team1', JSON_OBJECT('team_id', o1.team_id, 'odds', o1.odds),
            'team2', JSON_OBJECT('team_id', o2.team_id, 'odds', o2.odds)
        ) as odds
    FROM
        game_match AS gm
    JOIN team AS t1 ON gm.team1_id = t1.team_id
    JOIN team as t2 ON gm.team2_id = t2.team_id
    JOIN game as g ON gm.game_id = g.game_id
    JOIN odds as o1 ON gm.match_id = o1.match_id AND o1.team_id = t1.team_id
    JOIN odds as o2 ON gm.match_id = o2.match_id AND o2.team_id = t2.team_id
    LIMIT ? 
    OFFSET ?`;

        return new Promise((resolve, reject) => {
            db.query(query, [limit, offset],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {

                        // This is only on LOCAL 
                        // Theres no need to parse on deploy DB

                        //refactor 
                        // parsing is needed as the key of the data
                        // has backlasehs team2": "{\"id\": 8, \"name\": \"TSM\"}",

                        if (process.env.DB_HOST === "localhost") {
                            const parsedRows = result.map(row => {
                                return {
                                    ...row,
                                    team2: JSON.parse(row.team2),
                                    team1: JSON.parse(row.team1),
                                    game: JSON.parse(row.game),
                                    odds: JSON.parse(row.odds)
                                };
                            });
                            resolve(parsedRows);
                        }
                        else {
                            resolve(result);

                        }

                    }
                }
            );
        });
    }

    static getTotal() {
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) as total FROM game_match', (err, result) => {
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
            db.query('SELECT * FROM game_match LIMIT ? OFFSET ?', [limit, offset], (err, result) => {
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


    static getByPlayerId(player_id){
        let query = `
        SELECT
            gm.*,
            JSON_OBJECT('team_id', t1.team_id, 'name', t1.name ) as team2,
            JSON_OBJECT('team_id', t2.team_id, 'name', t2.name) as team1,
            JSON_OBJECT('game_id', g.game_id, 'name', g.name) as game,
            JSON_OBJECT(
                'team1', JSON_OBJECT('team_id', o1.team_id, 'odds', o1.odds),
                'team2', JSON_OBJECT('team_id', o2.team_id, 'odds', o2.odds)
            ) as odds,
            CASE 
                WHEN b.amount_after IS NULL THEN 'loss'
                ELSE 'win'
            END as result,
            b.amount_after as win_amount,
            b.amount,
            CASE 
                WHEN gm.winner_id IS NULL THEN 'pending'
                ELSE 'finished'
            END as status,
            CASE 
                WHEN b.bet_on_team_id = t1.team_id THEN 'team1'
                ELSE 'team2'
            END as selectedTeam
        FROM
            game_match AS gm 
        JOIN team AS t1 ON gm.team1_id = t1.team_id
        JOIN team as t2 ON gm.team2_id = t2.team_id
        JOIN game as g ON gm.game_id = g.game_id
        JOIN odds as o1 ON gm.match_id = o1.match_id AND o1.team_id = t1.team_id
        JOIN odds as o2 ON gm.match_id = o2.match_id AND o2.team_id = t2.team_id
        JOIN bet as b ON gm.match_id = b.match_id
WHERE b.player_id = ?;
        `;
        return new Promise((resolve, reject) => {
            db.query(query, [player_id], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (process.env.DB_HOST === "localhost") {
                        const parsedRows = result.map(row => {
                            return {
                                ...row,
                                team2: JSON.parse(row.team2),
                                team1: JSON.parse(row.team1),
                                game: JSON.parse(row.game),
                                odds: JSON.parse(row.odds)
                            };
                        });
                        resolve(parsedRows);
                    }
                    else {
                        resolve(result);

                    }

                }
            });
        });
    }


    static getAllPendingMatch() {
        let query = ` 
        SELECT
            gm.*,
            JSON_OBJECT('team_id', t1.team_id, 'name', t1.name ) as team2,
            JSON_OBJECT('team_id', t2.team_id, 'name', t2.name) as team1,
            JSON_OBJECT('game_id', g.game_id, 'name', g.name) as game,
            JSON_OBJECT(
                'team1', JSON_OBJECT('team_id', o1.team_id, 'odds', o1.odds),
                'team2', JSON_OBJECT('team_id', o2.team_id, 'odds', o2.odds)
            ) as odds
        FROM
            game_match AS gm 
        JOIN team AS t1 ON gm.team1_id = t1.team_id
        JOIN team as t2 ON gm.team2_id = t2.team_id
        JOIN game as g ON gm.game_id = g.game_id
        JOIN odds as o1 ON gm.match_id = o1.match_id AND o1.team_id = t1.team_id
        JOIN odds as o2 ON gm.match_id = o2.match_id AND o2.team_id = t2.team_id
        WHERE gm.winner_id IS NULL;`;
        return new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (process.env.DB_HOST === "localhost") {
                        const parsedRows = result.map(row => {
                            return {
                                ...row,
                                team2: JSON.parse(row.team2),
                                team1: JSON.parse(row.team1),
                                game: JSON.parse(row.game),
                                odds: JSON.parse(row.odds)
                            };
                        });
                        resolve(parsedRows);
                    }
                    else {
                        resolve(result);

                    }

                }
            });
        });
    }

    static getAllFinishedMatch(limit, offset) {
        let query = ` 
        SELECT
            gm.*,
            JSON_OBJECT('team_id', t1.team_id, 'name', t1.name ) as team2,
            JSON_OBJECT('team_id', t2.team_id, 'name', t2.name) as team1,
            JSON_OBJECT('game_id', g.game_id, 'name', g.name) as game,
            JSON_OBJECT(
                'team1', JSON_OBJECT('team_id', o1.team_id, 'odds', o1.odds),
                'team2', JSON_OBJECT('team_id', o2.team_id, 'odds', o2.odds)
            ) as odds
        FROM
            game_match AS gm 
        JOIN team AS t1 ON gm.team1_id = t1.team_id
        JOIN team as t2 ON gm.team2_id = t2.team_id
        JOIN game as g ON gm.game_id = g.game_id
        JOIN odds as o1 ON gm.match_id = o1.match_id AND o1.team_id = t1.team_id
        JOIN odds as o2 ON gm.match_id = o2.match_id AND o2.team_id = t2.team_id
        WHERE gm.winner_id IS NOT NULL`;

        return new Promise((resolve, reject) => {
            db.query(query, [limit, offset], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (process.env.DB_HOST === "localhost") {
                        const parsedRows = result.map(row => {
                            return {
                                ...row,
                                team2: JSON.parse(row.team2),
                                team1: JSON.parse(row.team1),
                                game: JSON.parse(row.game),
                                odds: JSON.parse(row.odds)
                            };
                        });
                        resolve(parsedRows);
                    }
                    else {
                        resolve(result);

                    }
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
    static async setWinner(match_id, winner_id) {
        try {
            const result = await new Promise((resolve, reject) => {
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
            await betModel.payout(match_id, winner_id);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    static updateDate(match_id, match_date_time) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE game_match SET  match_date_time = ? WHERE match_id = ?',
                [match_date_time, match_id],
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