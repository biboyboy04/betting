import { handleResponse } from '../utility.js';
import playerModel from '../models/playerModel.js';
import matchModel from '../models/matchModel.js';
import betModel from '../models/betModel.js';
import generateModel from '../models/generateModel.js';

class GenerateController {
    static async generateUsers(req, res) {
        const {number_of_players} = req.body;
        if (!number_of_players || isNaN(number_of_players) || number_of_players < 1) {
            return res.status(400).json({ message: "Invalid number of users" });
        }
        const players = generateModel.generatePlayerData(number_of_players);
        handleResponse(res, playerModel.addMany(players), 201);
    }

    static async generateMatches(req, res) {
        const {number_of_matches} = req.body;
        if (!number_of_matches || isNaN(number_of_matches) || number_of_matches < 1) {
            res.status(400).send({ message: "Invalid number of users" })
        }

        const matches = await generateModel.generateMatchData(number_of_matches);
        handleResponse(res, matchModel.addMany(matches), 201);
    } 

    static async generateBets(req, res) {
        const {number_of_bets} = req.body;
        if (!number_of_bets || isNaN(number_of_bets) || number_of_bets < 1) {
            res.status(400).send({ message: "Invalid number of users" })
        }

        const bets = await generateModel.generateBetData(number_of_bets);
        handleResponse(res, betModel.addMany(bets), 201);
        console.log("first")
    }

    static async generateWinners(req, res) {
        handleResponse(res, generateModel.generateWinners(), 201);   
    }

}
export default GenerateController;