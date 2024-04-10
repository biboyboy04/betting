import db from '../config/db.js';

class Transaction {
    static add(player_id, type, amount, balance) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO transaction (player_id, type, amount, balance) VALUES (?,?,?,?)',
                [player_id, type, amount, balance],
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
    
    static addMany(transactions) {
        const transactionsArray = transactions.map(transaction => {
            return [transaction.player_id, transaction.type, transaction.amount, transaction.balance];
        });
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO transaction (player_id, type, amount, balance) VALUES ?', [transactionsArray], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM transaction', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getAllFiltered(type, limit, offset) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM transaction WHERE type = ? LIMIT ? OFFSET ?', [type, limit, offset],  (err, result) => {
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
            db.query('SELECT * FROM transaction LIMIT ? OFFSET ?', [limit, offset], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    
    static getTotal(){
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) as total FROM transaction', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getTotalFiltered(filter){
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(*) as total FROM transaction WHERE type = ?',[filter], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static getById(transaction_id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM transaction WHERE transaction_id = ?', [transaction_id], (err, result) => {
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
            db.query('SELECT * FROM transaction WHERE player_id = ?', [player_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static update(transaction_id, player_id, type, amount, balance) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE transaction SET player_id = ?, type = ?, amount = ?, balance = ? WHERE transaction_id = ?',
                [player_id, type, amount, balance, transaction_id],
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

    static delete(transaction_id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM transaction WHERE transaction_id = ?', [transaction_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}
export default Transaction;