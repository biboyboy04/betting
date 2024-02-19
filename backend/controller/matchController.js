import matchModel from '../models/matchModel.js';

class MatchController {
    static async addMatch(req, res) {
        try {
            const { game_id, team1_id, team2_id, match_date, match_time, winner_id } = req.body;
            console.log(req.body)
            if (!game_id || !team1_id || !team2_id || !match_date || !match_time) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const result = await matchModel.addMatch(game_id, team1_id, team2_id, match_date, match_time, winner_id);
            if (result) {
                res.status(201).json(result);
            }
            else {
                return res.status(400).json({ message: "Match already exist" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getAllMatch(req, res) {
        try {
            const result = await matchModel.getAllMatch();
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Match found" });
            }

        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getMatchById(req, res) {
        try {
            const { match_id } = req.body;
            if (!match_id) {
                return res.status(400).json({ message: "Id is required" });
            }
            const result = await matchModel.getMatchById(match_id);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Match found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }


    static async getMatchByDateAndTime(req, res) {
        try {
            const { match_date, match_time } = req.body;
            if (!match_date || !match_time) {
                return res.status(400).json({ message: "Date and Time is required" });
            }
            const result = await matchModel.getMatchByDateAndTime(match_date, match_time);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Match found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getMatchByGameId(req, res) {
        try {
            const { game_id } = req.body;
            if (!game_id) {
                return res.status(400).json({ message: "Id is required" });
            }
            const result = await matchModel.getMatchByGameId(game_id);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Match found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }


    static async updateMatch(req, res) {
        try {
            const { match_id, game_id, team1_id, team2_id, match_date, match_time, winner_id } = req.body;
            if (!match_id || !game_id || !team1_id || !team2_id || !match_date || !match_time) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const result = await matchModel.updateMatch(match_id, game_id, team1_id, team2_id, match_date, match_time, winner_id);
            if (result) {
                return res.status(200).json(result);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async deleteMatch(req, res) {
        try {
            const { match_id } = req.body;
            if (!match_id) {
                return res.status(400).json({ message: "Id is required" });
            }
            const result = await matchModel.deleteMatch(match_id);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Match found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

export default MatchController;