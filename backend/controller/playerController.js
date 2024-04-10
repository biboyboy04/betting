import playerModel from '../models/playerModel.js';
import { handleResponse } from '../utility.js';

class PlayerController {
    static add(req, res) {
        const { username, password, email, first_name, last_name, date_of_birth, nationality } = req.body;
        console.log(req.body)
        if (!username || !password || !email || !first_name || !last_name || !date_of_birth || !nationality ) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, playerModel.add(username, password, email, first_name, last_name, date_of_birth, nationality), 201);
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


    // static async getAll(req, res) {
    //     handleResponse(res, playerModel.getAll());
    // }
    
    static getAll(req, res) {
        const query = req.query
        const page = query.page || 1;
        const limit = query.limit || 25;

        const offset = (page - 1) * limit;

        // add unary to convert string int to real int
        handleResponse(res, playerModel.getAllPaginated(+limit, +offset))
    }

    static getById(req, res) {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, playerModel.getById(id));
    }

    static getTotal(req, res) {
        handleResponse(res, playerModel.getTotal());
    }

    static getByUsername(req, res) {
        const username = req.params.username;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        handleResponse(res, playerModel.getByUsername(username));
    }


    static update(req, res) {
        const player_id = req.params.id;
        const { username, email, first_name, last_name, date_of_birth, nationality, balance} = req.body;
        if (!player_id || !username || !email  || !first_name || !last_name || !date_of_birth || !nationality || !balance) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, playerModel.update(player_id, username, email, first_name, last_name, date_of_birth, nationality, balance));
    }

    static delete(req, res) {
        const player_id = req.params.id;
        if (!player_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, playerModel.delete(player_id));

    }

    static deposit(req, res) {
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

    static withdraw(req, res) {
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
