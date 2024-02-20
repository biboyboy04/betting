import employeeModel from '../models/employeeModel.js';
import bcrypt from 'bcrypt';

class EmployeeController {
    static async addEmployee(req, res) {
        try {
            const { username, email, password, roleId } = req.body;
            if (!username || !email || !password || !roleId) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const result = await employeeModel.addEmployee(username, email, password, roleId);
            if (result) {
                return res.status(201).json(result);
            }
            else {
                return res.status(400).json({ message: "Employee already exist" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getAllEmployee(req, res) {
        try {
            const result = await employeeModel.getAllEmployee();
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No employee found" });
            }

        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getEmployeeById(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Id is required" });
            }
            const result = await employeeModel.getEmployeeById(id);
            console.log(result)
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No employee found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async updateEmployee(req, res) {
        try {
            //can still refactor, dont update unchanged fields
            const id = req.params.id;
            const { username, email, password, roleId } = req.body;
            if (!id || !username || !email || !password || !roleId) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const result = await employeeModel.updateEmployee(id, username, email, password, roleId);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No employee found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async deleteEmployee(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Id is required" });
            }
            const result = await employeeModel.deleteEmployee(id);
            if (result) {
                return res.status(200).json(result);
            }
            else {
                return res.status(400).json({ message: "No employee found" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

}

export default EmployeeController;