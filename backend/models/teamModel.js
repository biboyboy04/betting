import db from '../config/db.js';

class Team {
    static add(name) {
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

    static getAll() {
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

    static getAllId() {
        return new Promise((resolve, reject) => {
            db.query('SELECT team_id from team', (err, result) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        });
    }

    static getById(team_id) {
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

    static update(team_id, name) {
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

    static delete(team_id) {
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