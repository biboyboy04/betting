import oddsModel from '../models/oddsModel.js';
import betModel from '../models/betModel.js';
import { handleResponse } from '../utility.js';

class oddsController {
    static async add(req, res) {
        //refactor oddsModel
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "All fields are required" });
        }

        handleResponse(res, oddsModel.add(id), 201);
    }

    static async getAll(req, res) {
        handleResponse(res, oddsModel.getAll());
    }

    static async getById(req, res) {
        const odds_id = req.params.id;
        if (!odds_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, oddsModel.getById(odds_id));
    }

    static async getByMatchId(req, res) {
        const match_id = req.params.id;
        if (!match_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, oddsModel.getByMatchId(match_id));
    }

    static async update(req, res) {
        const odds_id = req.params.id;
        const { match_id, team_id, odds } = req.body;
        if (!odds_id || !match_id || !team_id || !odds) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, oddsModel.update(odds_id, match_id, team_id, odds));
    }

    static async delete(req, res) {
        const odds_id = req.params.id;
        if (!odds_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, oddsModel.delete(odds_id));
    }
}

export default oddsController;