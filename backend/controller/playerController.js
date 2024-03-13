import playerModel from '../models/playerModel.js';
import { handleResponse } from '../utility.js';

class PlayerController {
    static async add(req, res) {
        const { username, password, email, first_name, last_name, date_of_birth, nationality, balance } = req.body;
        if (!username || !password || !email || !first_name || !last_name || !date_of_birth || !nationality || !balance) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, playerModel.add(username, email, password, first_name, last_name, date_of_birth, nationality, balance), 201);
    }

    static async addMany(req, res) {
        const players = req.body.players;
        if (!players || !Array.isArray(players)) {
            return res.status(400).json({ message: "Invalid players data" });
        }
        const promises = players.map(player => {
            const { username, password, email, first_name, last_name, date_of_birth, nationality, balance } = player;
            if (!username || !password || !email || !first_name || !last_name || !date_of_birth || !nationality || !balance) {
                return Promise.reject({ message: "Invalid player data" });
            }
            return playerModel.add(username, email, password, first_name, last_name, date_of_birth, nationality, balance);
        });
        try {
            const results = await Promise.all(promises);
            handleResponse(res, results, 201);
        } catch (error) {
            handleResponse(res, error, 400);
        }
    }


    static async getAll(req, res) {
        handleResponse(res, playerModel.getAll());
    }

    static async getById(req, res) {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, playerModel.getById(id));
    }

    static async getByUsername(req, res) {
        const username = req.params.username;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        handleResponse(res, playerModel.getByUsername(username));
    }


    static async update(req, res) {
        const player_id = req.params.id;
        const { username, email, password, first_name, last_name, date_of_birth } = req.body;
        if (!player_id || !username || !email || !password || !first_name || !last_name || !date_of_birth) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, playerModel.update(player_id, username, email, password, first_name, last_name, date_of_birth));
    }

    static async delete(req, res) {
        const player_id = req.params.id;
        if (!player_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, playerModel.delete(player_id));

    }

    static async deposit(req, res) {
        const player_id = req.params.id;
        const amount = req.body.amount;
        if (!player_id || !amount) {
            return res.status(400).json({ message: "player_id and amount are required" });
        }
        if(isNaN(amount) || amount < 1) {
            return res.status(400).json({ message: "Invalid amount"});
        }

        handleResponse(res, playerModel.deposit(player_id, amount));
    }

    static async withdraw(req, res) {
        const player_id = req.params.id;
        const amount = req.body.amount;
        if (!player_id || !amount) {
            return res.status(400).json({ message: "player_id and amount are required" });
        }
        if(isNaN(amount) || amount < 1) {
            return res.status(400).json({ message: "Invalid amount"});
        }

        handleResponse(res, playerModel.withdraw(player_id, amount));
    }

}

export default PlayerController;
