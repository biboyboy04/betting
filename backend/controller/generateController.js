import { handleResponse } from '../utility.js';
import playerModel from '../models/playerModel.js';
import matchModel from '../models/matchModel.js';
import betModel from '../models/betModel.js';
import generateModel from '../models/generateModel.js';

class GenerateController {
    static async generateUsers(req, res) {
        const numberOfPlayers = req.params.numberOfPlayers;
        if (!numberOfPlayers || isNaN(numberOfPlayers) || numberOfPlayers < 1) {
            return res.status(400).json({ message: "Invalid number of users" });
        }
        const players = generateModel.generatePlayerData(numberOfPlayers);
        handleResponse(res, playerModel.addMany(players), 201);
    }

    static async generateMatches(req, res) {
        const numberOfMatches = req.params.numberOfMatches;
        if (!numberOfMatches || isNaN(numberOfMatches) || numberOfMatches < 1) {
            res.status(400).send({ message: "Invalid number of users" })
        }

        const matches = await generateModel.generateMatchData(numberOfMatches);
        handleResponse(res, matchModel.addMany(matches), 201);
    } 

    static async generateBets(req, res) {
        const numberOfBets = req.params.numberOfBets;
        if (!numberOfBets || isNaN(numberOfBets) || numberOfBets < 1) {
            res.status(400).send({ message: "Invalid number of users" })
        }

        const bets = await generateModel.generateBetData(numberOfBets);
        handleResponse(res, betModel.addMany(bets), 201);
    }

    static async generateWinners(req, res) {
        handleResponse(res, generateModel.generateWinners(), 201);   
    }

}
export default GenerateController;