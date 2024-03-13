import matchModel from '../models/matchModel.js';
import oddsModel from '../models/oddsModel.js';
import { handleResponse } from '../utility.js';


class MatchController {
    static async add(req, res) {
        const { game_id, team1_id, team2_id, match_date_time } = req.body;
        if (!game_id || !team1_id || !team2_id || !match_date_time) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const a = await handleResponse(res, matchModel.add(game_id, team1_id, team2_id, match_date_time), 201);
        console.log(a, "asd")
        // handleResponse(res, oddsModel.insertOdds(game_id, team1_id, team2_id, match_date_time), 201);

    }

    static async getAll(req, res) {
        handleResponse(res, matchModel.getAll())
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
        handleResponse(res, matchModel.getAllPendingMatch());
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
