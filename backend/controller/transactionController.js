import transactionModel from '../models/transactionModel.js';
import { handleResponse } from '../utility.js';

class TransactionController {
    static async add(req, res) {
        const { player_id, amount, transaction_type, transaction_time } = req.body;
        if (!player_id || !amount || !transaction_type || !transaction_time) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, transactionModel.add(player_id, amount, transaction_type, transaction_time), 201);
    }


    static getAll(req, res) {
        const query = req.query
        const page = query.page || 1;
        const limit = query.limit || 25;

        const offset = (page - 1) * limit;

        const type = req.params.type;
        if (type) {
            handleResponse(res, transactionModel.getAllFiltered(type, +limit, +offset));
            return;
        }

        // add unary to convert string int to real int
        handleResponse(res, transactionModel.getAllPaginated(+limit, +offset))
    }
    
    static getTotal(req, res) {
        const type = req.params.type;
        if (type) {
            handleResponse(res, transactionModel.getTotalFiltered(type));
            return;
        }

        handleResponse(res, transactionModel.getTotal());
    }

    static async getById(req, res) {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, transactionModel.getById(id));
    }

    static async getByPlayerId(req, res) {
        const player_id = req.params.id;
        if (!player_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, transactionModel.getByPlayerId(player_id));
    }

    static async update(req, res) {
        const id = req.params.id;
        const { player_id, type, description, amount, balance } = req.body;
        if (!id || !player_id || !type || !description || !amount || !balance) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, transactionModel.update(id, player_id, type, description, amount, balance));

    }

    static async delete(req, res) {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, transactionModel.delete(id));
    }

}
export default TransactionController;