import db from '../config/db.js';
import bcrypt from 'bcrypt';

class Employee {
    static add(username, password, email, first_name, last_name, date_of_birth, role_id) {
        return new Promise((resolve, reject) => {
            // check if username  already exist before adding to db
            this.getByUsername(username).then((result) => {
                if (result.length > 0) {
                    reject('Username already exist');
                } else {
                    const hashed_password = bcrypt.hashSync(password, 10);
                    db.query('INSERT INTO employee (username, password, email, first_name, last_name, date_of_birth,  role_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                        [username, hashed_password, email, first_name, last_name, date_of_birth, role_id]
                        , (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM employee', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getById(employee_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM employee WHERE employee_id = ?', [employee_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getByUsername(username) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM employee WHERE username = ?', [username], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static update(employee_id, username, password, email, first_name, last_name, date_of_birth, role_id) {
        return new Promise((resolve, reject) => {
            const hashed_password = bcrypt.hashSync(password, 10);
            db.query('UPDATE employee SET username = ?, password = ?, email = ?, first_name = ?, last_name = ?, date_of_birth = ?, role_id = ? WHERE employee_id = ?',
                [username, hashed_password, email, first_name, last_name, date_of_birth, role_id, employee_id],
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

    static delete(employee_id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM employee WHERE employee_id = ?', [employee_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}

export default Employee;
