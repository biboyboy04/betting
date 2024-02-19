import db from '../config/db.js';

class Employee {
    static addEmployee(username, email, password, roleId) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO employee (username, email, password, role_id) VALUES (?, ?, ?, ?)',
                [username, email, password, roleId],
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

    static getAllEmployee() {
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

    static getEmployeeById(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM employee WHERE employee_id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static updateEmployee(id, username, email, password, roleId) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE employee SET username = ?, email = ?, password = ?, role_id = ? WHERE employee_id = ?',
                [username, email, password, roleId, id],
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

    static deleteEmployee(id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM employee WHERE employee_id = ?', [id], (err, result) => {
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
