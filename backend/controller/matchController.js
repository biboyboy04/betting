import matchModel from '../models/matchModel.js';
import oddsModel from '../models/oddsModel.js';
import { handleResponse } from '../utility.js';


class MatchController {
    static async add(req, res) {
        const { game_id, team1_id, team2_id, match_date_time } = req.body;
        if (!game_id || !team1_id || !team2_id || !match_date_time) {
            return res.status(400).json({ message: "All fields are required" });
        }

        try {
            await matchModel.add(game_id, team1_id, team2_id, match_date_time);
            res.status(200).json({ message: "Match added successfully" });
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }

    static async getAll(req, res) {
        const query = req.query
        const page = query.page || 1;
        const limit = query.limit || 25;

        const offset = (page - 1) * limit;

        // handleResponse(res, matchModel.getTotal());
        // add unary to convert string int to real int
        handleResponse(res, matchModel.getAllDetailsPaginated(+limit, +offset))
    }

    static getTotal(req, res){
        handleResponse(res, matchModel.getTotal());
    }

    static async getAllDetails(req, res) {
        handleResponse(res, matchModel.getAllDetails())
    }

    static async getById(req, res) {
        const match_id = req.params.id;
        if (!match_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, matchModel.getById(match_id));
    }

    static async getAllPendingMatchId(req, res) {
        handleResponse(res, matchModel.getAllPendingMatchId());
    }

    static async getAllPendingMatch(req, res) {
        const query = req.query
        const page = query.page || 1;
        const limit = query.limit || 25;

        const offset = (page - 1) * limit;

        handleResponse(res, matchModel.getAllPendingMatch(+limit, +offset));
    }

    static getAllFinishedMatch(req, res) {
        handleResponse(res, matchModel.getAllFinishedMatch());
    }

    static async getByDateAndTime(req, res) {
        const match_date_time = req.params.dateTime;
        if (!match_date_time) {
            return res.status(400).json({ message: "Date and time are required" });
        }
        handleResponse(res, matchModel.getByDateAndTime(match_date_time));
    }

    static async getByGameId(req, res) {
        const game_id = req.params.id;
        if (!game_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, matchModel.getByGameId(game_id));

    }

    //do i need to uincluide getAllPendingMatchId, getallPendingMatchWithBets

    static async update(req, res) {
        const match_id = req.params.id;
        const { game_id, team1_id, team2_id, match_date_time, winner_id } = req.body;
        if (!match_id || !game_id || !team1_id || !team2_id || !match_date_time || !winner_id) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, matchModel.update(match_id, game_id, team1_id, team2_id, match_date_time, winner_id));
    }

    static async delete(req, res) {
        const match_id = req.params.id;
        if (!match_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, matchModel.delete(match_id));
    }

}

export default MatchController;
