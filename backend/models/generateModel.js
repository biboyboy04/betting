import { faker } from '@faker-js/faker/locale/en'; // for generating fake data
import gameModel from './gameModel.js';
import teamModel from './teamModel.js'
import playerModel from './playerModel.js'
import matchModel from './matchModel.js'
import betModel from './betModel.js';
import oddsModel from './oddsModel.js';
import { getRandomIndex } from '../utility.js'

class Generate {
    // add try catch?
    static generatePlayerData(num) {
        const players = [];
        for (let i = 0; i < num; i++) {
            // the default format sample for faker.date.birthdate() is: Mon Mar 05 1990 17:51:06 GMT+0800 (Philippine Standard Time)
            // iso string = is in this format: "2021-10-10T00:00:00.000Z"
            // so we need to split the string and get the first part "2021-10-10"
            const first_name = faker.person.firstName();
            const last_name = faker.person.lastName();
            const username = faker.internet.userName({ firstName: first_name, lastName: last_name })
            const password = faker.internet.password();
            const email = faker.internet.exampleEmail({ firstName: first_name, lastName: last_name });
            const date_of_birth = faker.date.birthdate().toISOString().split('T')[0];
            const nationality = faker.location.country();
            const balance = faker.number.int({ min: 9999, max: 999999 });

            // note: there's a short hand for key value pair. 
            // If the key that you want is the same as the var name, 
            // you can just put the var name
            players.push({
                username,
                password,
                email,
                first_name,
                last_name,
                date_of_birth,
                nationality,
                balance
            });
        }

        return players;
    };

    static async generateMatchData(num) {
        // RNG for game_id, team1_id, team2_id, match_date_time, 
        // refactor? max range could be the length of teams in the database instead of a constant value?
        const matches = [];
        const allGameId = await gameModel.getAllId();
        const allTeamId = await teamModel.getAllId();

        for (let i = 0; i < num; i++) {
            const randomGameIndex = getRandomIndex(allGameId.length);
            const randomTeam1Index = getRandomIndex(allTeamId.length);

            const game_id = allGameId[randomGameIndex]['game_id'];
            const team1_id = allTeamId[randomTeam1Index]['team_id']

            // this is to ensure that team1 and team2 have different ID's as we are using RNG
            // re assinging another id if team1_id is same as team2_id
            // refactor: add ? on allTeamId[randomTeam2Index]['team_id'] to ensure it doenst error out if the value is undefined
            let team2_id;
            do {
                const randomTeam2Index = getRandomIndex(allTeamId.length);
                team2_id = allTeamId[randomTeam2Index]['team_id']
            }
            while (team2_id === team1_id)

            const match_date_time = Generate.getCurrentDateAndTime();

            matches.push({
                game_id,
                team1_id,
                team2_id,
                match_date_time
            });
        }
        return matches;
    }

    static async generateBetData(num) {
        const bets = [];
        const allPlayerId = await playerModel.getAllId();
        const allMatchId = await matchModel.getAllPendingMatchId();

        for (let i = 0; i < num; i++) {
            const randomPlayerIndex = getRandomIndex(allPlayerId.length);
            const randomMatchIndex = getRandomIndex(allMatchId.length);

            const player_id = allPlayerId[randomPlayerIndex]['player_id'];
            const match_id = allMatchId[randomMatchIndex]['match_id'];
            const amount = faker.number.int({ min: 10, max: 100 });

            // get all teams that are participating in the match
            const matchTeamId = await matchModel.getTeamsByMatchId(match_id);
            const { team1_id, team2_id } = matchTeamId[0];

            // if i is even, assign team1_id else team2_id
            const bet_on_team_id = (i % 2 == 0) ? team1_id : team2_id;

            bets.push({
                player_id,
                match_id,
                amount,
                bet_on_team_id,
            });
        }
        return bets;
    }

    // refactor to choose choosing a number of winners only instead of all?
    static async generateWinners() {
        // Get id's of allPendingMatchWithBets
        const allPendingMatchWithBets = await matchModel.getAllPendingMatchWithBets();

        for (let i = 0; i < allPendingMatchWithBets.length; i++) {
            const match_id = allPendingMatchWithBets[i]['match_id'];
            const matchTeamId = await matchModel.getTeamsByMatchId(match_id);
            const { team1_id, team2_id } = matchTeamId[0];
            const randomWinnerId = (i % 2 == 0) ? team1_id : team2_id;
            await matchModel.setWinnerAllPendingMatches(match_id, randomWinnerId);
            await oddsModel.add(match_id);
            // const testt = await betModel.getWinnersId(match_id, randomWinnerId);
            const test = await betModel.payout(match_id, randomWinnerId);
            console.log(test, "test")
            
        }
        return "Generated Winners Sucessfully";
    }

    static getCurrentDateAndTime() {
        var currentDate = new Date();

        // Get the current date
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1; // + 1 because the start is 0
        var year = currentDate.getFullYear();

        // Format date
        var formattedDate = year + '-' + month + '-' + day; // Example: 2024-3-5

        // Get the current time
        var hours = currentDate.getHours();
        var minutes = currentDate.getMinutes();
        var seconds = currentDate.getSeconds();

        // Format time
        var formattedTime = hours + ':' + minutes + ':' + seconds; // Example: 15:30:45

        return formattedDate + ' ' + formattedTime;
    }

}
export default Generate;