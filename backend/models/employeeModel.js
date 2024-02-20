import db from '../config/db.js';
import bcrypt from 'bcrypt';

class Employee {
    static addEmployee(username, email, password, roleId) {
        return new Promise((resolve, reject) => {
            // check if username and email already exist
            db.query('SELECT * FROM employee WHERE username = ? OR email = ?', [username, email], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (result.length > 0) {
                        reject('Username or email already exist');
                    } else {
                        const hashedPassword = bcrypt.hashSync(password, 10);
                        db.query('INSERT INTO employee (username, email, password, role_id) VALUES (?, ?, ?, ?)',
                            [username, email, hashedPassword, roleId]
                            , (err, result) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve("Employee added successfully");
                                }
                            }
                        );
                    }
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
                    resolve('Employees retrieved successfully');
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
                    resolve('Employee retrieved successfully');
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
                        resolve('Employee updated successfully');
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
                    resolve('Employee deleted successfully');
                }
            });
        });
    }

}

export default Employee;
