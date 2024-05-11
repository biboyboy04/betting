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
        console.log(query, "query");
        const page = query.page || 1;
        const limit = query.limit || 25;
        const status = query.status || "all";

        const offset = (page - 1) * limit;

        switch (status) {
            case "pending":
                handleResponse(res, matchModel.getAllPendingMatch(+limit, +offset))
                break;
            case "finished":
                handleResponse(res, matchModel.getAllFinishedMatch(+limit, +offset))
                break;
            default:
                handleResponse(res, matchModel.getAllDetailsPaginated(+limit, +offset))
                break;
        }
       
    }

    static getTotal(req, res) {
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

    
    static getPlayerId(req, res) {
        const player_id = req.params.id;

        if (!player_id) {
            return res.status(400).json({ message: "Player ID is required" });
        }

        handleResponse(res, matchModel.getByPlayerId(player_id));
    }

    //do i need to uincluide getAllPendingMatchId, getallPendingMatchWithBets

    static async updateDate(req, res) {
        const match_id = req.params.id;
        const { match_date_time } = req.body;
        if (!match_id || !match_date_time) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, matchModel.updateDate(match_id, match_date_time));
    }

    static async setWinner(req, res) {
        const match_id = req.params.id;
        const { winner_id } = req.body;
        if (!match_id || !winner_id) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, matchModel.setWinner(match_id, winner_id));
    }

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
