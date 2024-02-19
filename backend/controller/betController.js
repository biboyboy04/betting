import betModel from '../models/betModel.js';

class BetController {
    static async addBet(req, res) {
        try {
            const { player_id, match_id, amount, bet_on_team_id, bet_time } = req.body;
            if (!player_id || !match_id || !amount || !bet_on_team_id || !bet_time) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const result = await betModel.addBet(player_id, match_id, amount, bet_on_team_id, bet_time);
            if (result) {
                res.status(201).json(result);
            }
            else {
                return res.status(400).json({ message: "Bet already exist" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getAllBet(req, res) {
        try {
            const result = await betModel.getAllBet();
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Bet found" });
            }

        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getBetById(req, res) {
        try {
            const { bet_id } = req.body;
            if (!bet_id) {
                return res.status(400).json({ message: "Id is required" });
            }
            const result = await betModel.getBetById(bet_id);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Bet found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getBetByPlayerId(req, res) {
        try {
            const { player_id } = req.body;
            if (!player_id) {
                return res.status(400).json({ message: "Id is required" });
            }
            const result = await betModel.getBetByPlayerId(player_id);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Bet found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getBetByMatchId(req, res) {
        try {
            const { match_id } = req.body;
            if (!match_id) {
                return res.status(400).json({ message: "Id is required" });
            }
            const result = await betModel.getBetByMatchId(match_id);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Bet found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async updateBet(req, res) {
        try {
            const { bet_id, player_id, match_id, amount, bet_on_team_id, bet_time } = req.body;
            if (!bet_id || !player_id || !match_id || !amount || !bet_on_team_id || !bet_time) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const result = await betModel.updateBet(bet_id, player_id, match_id, amount, bet_on_team_id, bet_time);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Bet found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async deleteBet(req, res) {
        try {
            const { bet_id } = req.body;
            if (!bet_id) {
                return res.status(400).json({ message: "Id is required" });
            }
            const result = await betModel.deleteBet(bet_id);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Bet found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getTotalMatchBets(req, res) {
        try {
            const { match_id } = req.body;
            if (!match_id) {
                return res.status(400).json({ message: "Id is required" });
            }
            const result = await betModel.getTotalMatchBets(match_id);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Bet found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async payBet(req, res) {
        try {
            const { bet_id, player_id, match_id, amount, bet_on_team_id, bet_time } = req.body;
            if (!bet_id || !player_id || !match_id || !amount || !bet_on_team_id || !bet_time) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const result = await betModel.payBet(bet_id, player_id, match_id, amount, bet_on_team_id, bet_time);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Bet found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

}
export default BetController;