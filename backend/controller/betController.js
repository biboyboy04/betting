import betModel from '../models/betModel.js';
import { handleResponse } from '../utility.js';

class BetController {
    static async add(req, res) {
        const { player_id, match_id, amount, bet_on_team_id } = req.body;
        if (!player_id || !match_id || !amount || !bet_on_team_id) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, betModel.add(player_id, match_id, amount, bet_on_team_id), 201);
    }

    static async getAll(req, res) {
        handleResponse(res, betModel.getAll())
    }

    static getAll(req, res) {
        const query = req.query
        const page = query.page || 1;
        const limit = query.limit || 25;

        const offset = (page - 1) * limit;

        const type = req.params.type;
        if (type) {
            handleResponse(res, betModel.getAllFiltered(type, +limit, +offset));
            return;
        }

        // add unary to convert string int to real int
        handleResponse(res, betModel.getAllPaginated(+limit, +offset))
    }

    static getTotal(req, res) {
        handleResponse(res, betModel.getTotal());
    }


    static async getAllWithMatch(req, res) {
        handleResponse(res, betModel.getAllWithMatch())
    }

    static async getById(req, res) {
        const bet_id = req.params.id;
        if (!bet_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, betModel.getById(bet_id));
    }

    static async getByPlayerId(req, res) {
        const player_id = req.params.id;
        if (!player_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, betModel.getByPlayerId(player_id));

    }

    static async getByMatchId(req, res) {
        const match_id = req.params.id;
        if (!match_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, betModel.getByMatchId(match_id));

    }

    static async update(req, res) {
        const bet_id = req.params.id;
        const { player_id, match_id, amount, bet_on_team_id, bet_time } = req.body;
        if (!bet_id || !player_id || !match_id || !amount || !bet_on_team_id || !bet_time) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, betModel.update(bet_id, player_id, match_id, amount, bet_on_team_id, bet_time));


    }

    static async delete(req, res) {
        const bet_id = req.params.id;
        if (!bet_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, betModel.delete(bet_id));

    }

    static async getTotalMatchBets(req, res) {
        const match_id = req.params.id;
        if (!match_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, betModel.getTotalMatchBets(match_id));
    }

    static async getMatchWithBets(req, res) {
        handleResponse(res, betModel.getMatchWithBets());
    }

    static async payout(req, res) {
        const { match_id, winner_id } = req.body;
        if (!match_id, !winner_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, betModel.payout(match_id, winner_id));
    }

}

export default BetController;
