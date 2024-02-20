import matchModel from '../models/matchModel.js';

class MatchController {
    static async addMatch(req, res) {
        try {
            const id = req.params.id;
            const { team1_id, team2_id, match_date, match_time, winner_id } = req.body;
            if (!id || !team1_id || !team2_id || !match_date || !match_time) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const result = await matchModel.addMatch(id, team1_id, team2_id, match_date, match_time, winner_id);
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
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Id is required" });
            }
            const result = await matchModel.getMatchById(id);
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
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Id is required" });
            }
            const result = await matchModel.getMatchByGameId(id);
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
            const id = req.params.id;
            const { game_id, team1_id, team2_id, match_date, match_time, winner_id } = req.body;
            if (!id || !game_id || !team1_id || !team2_id || !match_date || !match_time) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const result = await matchModel.updateMatch(id, game_id, team1_id, team2_id, match_date, match_time, winner_id);
            if (result) {
                return res.status(200).json(result);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async deleteMatch(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Id is required" });
            }
            const result = await matchModel.deleteMatch(id);
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