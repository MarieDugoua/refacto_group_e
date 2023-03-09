import {expect} from 'chai';
import {describe, it} from 'mocha';
import {ConsoleSpy} from "../src/ConsoleSpy";
import {Game} from "../src/game";
import {readFileSync, writeFileSync} from "fs";
import {RandomSpy} from "../src/RandomSpy";

describe('The Golden Master', () => {

    const data =
        [
            //          ["Billy"],
            ["Billy", "Villy"],
            ["Billy", "Villy", "Killy"],
            ["Billy", "Villy", "Killy", "Milly", "Rilly", "Zilly", "Lilly"],
        ];

    describe("write master", () => {
        data.forEach(
            players => {
                it("write with " + players.length + " player", () => {
                    const consoleSpy = new ConsoleSpy();
                    const game = new Game(consoleSpy);

                    play(game, players);

                    writeFileSync("tests/goldenMaster/testWith" + players.length + "Players.txt", consoleSpy.content);
                });
            }
        );
    });


    describe("read", () => {
        data.forEach(
            players => {
                it("with " + players.length + " players", () => {
                    const consoleSpy = new ConsoleSpy();
                    const game = new Game(consoleSpy);
                    const expectedContent = readFileSync("tests/goldenMaster/testWith" + players.length + "Players.txt", "utf8");

                    play(game, players);

                    const actualContent = consoleSpy.content;
                    expect(actualContent).equals(expectedContent);
                });
            }
        )

    })
});

const play = (game: Game, players: string[]) => {
    players.forEach(player => game.add(player));
    const randomGen = new RandomSpy();


    let notAWinner;
    do {

        game.roll(Math.floor(randomGen.random() * 6) + 1);

        if (Math.floor(randomGen.random() * 10) == 7) {
            notAWinner = game.wrongAnswer();
        } else {
            notAWinner = game.wasCorrectlyAnswered();
        }

    } while (notAWinner);
}
