import playerModel from '../models/playerModel.js';

class PlayerController {
    static async addPlayer(req, res) {
        try {
            const { username, password, email, first_name, last_name, dateOfBirth, nationality, balance } = req.body;
            console.log(req.body)
            const result = await playerModel.addPlayer(username, password, email, first_name, last_name, dateOfBirth, nationality, balance);
            if (result) {
                return res.status(201).json(result);
            }
            else {
                return res.status(400).json({ message: "Player already exist" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getAllPlayer(req, res) {
        try {
            const result = await playerModel.getAllPlayer();
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Player found" });
            }

        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getPlayerById(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Id is required" });
            }
            const result = await playerModel.getPlayerById(id);
            console.log(result)
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Player found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async updatePlayer(req, res) {
        try {
            //can still refactor, dont update unchanged fields
            const { id, username, password, firstName, lastName, dateOfBirth, nationality, balance } = req.body;

            if (!id || !username || !password || !firstName || !lastName || !dateOfBirth || !nationality || !balance) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const result = await playerModel.updatePlayer(id, username, password, firstName, lastName, dateOfBirth, nationality, balance);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Player found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async deletePlayer(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Id is required" });
            }
            const result = await playerModel.deletePlayer(id);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Player found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async addBalance(req, res) {
        try {
            const id = req.params.id;
            const amount = req.body.amount;
            if (!id || !amount) {
                return res.status(400).json({ message: "Id and amount is required" });
            }
            const result = await playerModel.addBalance(id, amount);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Player found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async deductBalance(req, res) {
        try {
            const id = req.params.id;
            const amount = req.body.amount;
            if (!id || !amount) {
                return res.status(400).json({ message: "Id and amount is required" });
            }
            const result = await playerModel.deductBalance(id, amount);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Player found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

export default PlayerController;