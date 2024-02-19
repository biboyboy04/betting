import gameModel from '../models/gameModel.js';

class GameController {
    static async addGame(req, res) {
        try {
            //figure the platform data type
            const { name, genre, description } = req.body;
            if (! !name || !genre || !description) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const result = await gameModel.addGame(name, genre, description);
            if (result) {
                return res.status(201).json(result);
            }
            else {
                return res.status(400).json({ message: "Game already exist" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getAllGame(req, res) {
        try {
            const result = await gameModel.getAllGame();
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Game found" });
            }

        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getGameById(req, res) {
        try {
            const { game_id } = req.body;
            if (!game_id) {
                return res.status(400).json({ message: "Id is required" });
            }
            const result = await gameModel.getGameById(game_id);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Game found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async updateGame(req, res) {
        try {
            const { game_id, name, genre, description } = req.body;
            if (!game_id || !name || !genre || !description) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const result = await gameModel.updateGame(game_id, name, genre, description);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Game found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async deleteGame(req, res) {
        try {
            const { game_id } = req.body;

            if (!game_id) {
                return res.status(400).json({
                    message: "Id is required"
                });
            }
            const result = await gameModel.deleteGame(game_id);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Game found" });
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

}
export default GameController;