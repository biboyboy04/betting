import db from '../config/db.js';

class Team {
    static addTeam(name) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO team (name) VALUES (?)',
                [name],
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
    static getAllTeam() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM team', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    static getTeamById(team_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM team WHERE team_id = ?', [team_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    static updateTeam(team_id, name) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE team SET name = ? WHERE team_id = ?',
                [name, team_id],
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
    static deleteTeam(team_id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM team WHERE team_id = ?', [team_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}
export default Team;