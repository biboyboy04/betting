import gameModel from '../models/gameModel.js';
import { handleResponse } from '../utility.js';

class GameController {
    static async add(req, res) {
        const { name, genre, description, platform } = req.body;
        if (!name || !genre || !description || !platform) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, gameModel.add(name, genre, description, platform), 201);
    }

    static async getAll(req, res) {
        handleResponse(res, gameModel.getAll());

    }

    static async getAllId(req, res) {
        handleResponse(res, gameModel.getAllId())
    }

    static async getById(req, res) {
        const game_id = req.params.id;
        if (!game_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, gameModel.getById(game_id));

    }

    static async update(req, res) {
        const { game_id, name, genre, description, platform } = req.body;
        if (!game_id || !name || !genre || !description || !platform) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, gameModel.update(game_id, name, genre, description, platform));

    }

    static async delete(req, res) {
        const game_id = req.params.id;
        if (!game_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, gameModel.delete(game_id));
    }

}

export default GameController;
