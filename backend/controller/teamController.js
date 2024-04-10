import teamModel from '../models/teamModel.js';
import { handleResponse } from '../utility.js';

class TeamController {
    static async add(req, res) {
        const { name} = req.body;
        if (!name ) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, teamModel.add(name), 201);
    }

    static async getAll(req, res) {
        handleResponse(res, teamModel.getAll());
    }

    static async getById(req, res) {
        const team_id = req.params.id;
        if (!team_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, teamModel.getById(team_id));
    }

    static async update(req, res) {
        const { team_id, name } = req.body;
        if (!team_id || !name) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, teamModel.update(team_id, name));
    }

    static async delete(req, res) {
        const team_id = req.params.id;
        console.log(team_id, "controlerls")
        if (!team_id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, teamModel.delete(team_id));
    }
}
export default TeamController;
