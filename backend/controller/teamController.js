import teamModel from '../models/teamModel.js';

class TeamController {
    static async addTeam(req, res) {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const result = await teamModel.addTeam(team_id, name);
            if (result) {
                return res.status(201).json(result);
            }
            else {
                return res.status(400).json({ message: "Team already exist" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getAllTeam(req, res) {
        try {
            const result = await teamModel.getAllTeam();
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Team found" });
            }

        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getTeamById(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Id is required" });
            }
            const result = await teamModel.getTeamById(id);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Team found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async updateTeam(req, res) {
        try {
            const id = req.params.id;
            const { name } = req.body;
            if (!id || !name) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const result = await teamModel.updateTeam(id, name);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Team found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async deleteTeam(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({
                    message: "Id is required"
                });
            }
            const result = await teamModel.deleteTeam(id);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No Team found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }

    }
}
export default TeamController;