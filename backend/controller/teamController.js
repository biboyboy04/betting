import teamModel from '../models/teamModel.js';
import { handleResponse } from '../utility.js';

class TeamController {
    static async add(req, res) {
        const { name, description, logo_url } = req.body;
        if (!name || !description || !logo_url) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, teamModel.add(name, description, logo_url), 201);
    }

    static async getAll(req, res) {
        handleResponse(res, teamModel.getAll());
    }

    static async getById(req, res) {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, teamModel.getById(id));
    }

    static async update(req, res) {
        const id = req.params.id;
        const { name } = req.body;
        if (!id || !name) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, teamModel.update(id, name));
    }

    static async delete(req, res) {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, teamModel.delete(id));
    }
}
export default TeamController;
