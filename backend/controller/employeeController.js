import employeeModel from '../models/employeeModel.js';
import { handleResponse } from '../utility.js';

class EmployeeController {
    static async add(req, res) {
        const { username, password, email, first_name, last_name, date_of_birth, role_id } = req.body;
        if (!username || !password || !email || !first_name || !last_name || !date_of_birth || !role_id) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, employeeModel.add(username, password, email, first_name, last_name, date_of_birth, role_id), 201);
    }

    static async getAll(req, res) {
        handleResponse(res, employeeModel.getAll());
    }

    static async getById(req, res) {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, employeeModel.getById(id));
    }

    static async getByUsername(req, res) {
        const username = req.params.username;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        handleResponse(res, employeeModel.getByUsername(username));
    }

    static async update(req, res) {
        const employee_id = req.params.id;
        const { username, password, email, first_name, last_name, date_of_birth, role_id } = req.body;
        if (!employee_id || !username || !password || !email || !first_name || !last_name || !date_of_birth || !role_id) {
            return res.status(400).json({ message: "All fields are required" });
        }
        handleResponse(res, employeeModel.update(employee_id, username, password, email, first_name, last_name, date_of_birth, role_id));
    }

    static async delete(req, res) {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }
        handleResponse(res, employeeModel.delete(id));
    }
}

export default EmployeeController;
