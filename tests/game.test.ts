import { expect, assert } from 'chai';
import { describe, it } from 'mocha';
import { GameRunner } from '../src/game-runner';
import { Game } from "../src/game";
import {NotEnoughPlayerError} from "../src/errors/NotEnoughPlayerError";
import {ConsoleSpy} from "../src/ConsoleSpy";
import {TooManyPlayerError} from "../src/errors/TooManyPlayerError";

describe('The test environment', () => {

    it("should access game", function () {
        expect(GameRunner).to.not.be.undefined;
    });

    it("should not have less than 2 players to play the game", () => {
        const consoleSpy = new ConsoleSpy();
        const game = new Game(consoleSpy);

        expect(() => game.roll(5)).to.throw(Error)

        game.add('Pet')

        expect(() => game.roll(5)).to.throw(Error)

        game.add('Ed')

        expect(() => game.roll(5)).not.to.throw(Error)
    })

    it("should not have more than 6 players to play the game", () => {
        const consoleSpy = new ConsoleSpy();
        const game = new Game(consoleSpy);

        game.add('Pet')
        game.add('Ed')
        game.add('Chat')
        game.add('Dog')
        game.add('Horse')
        game.add('Monkey')
        expect(() => game.roll(5)).not.to.throw(Error)

        game.add('Luffy')

        expect(() => game.roll(5)).to.throw(Error)
    })

    it('first player should leave a game', () => {
        const consoleSpy = new ConsoleSpy();
        const game = new Game(consoleSpy);
        const players: string[] = ['Pet', 'Ed', 'Chat']

        players.forEach((player) => game.add(player))

        game.roll(4)

        game.makeThePlayerQuit()

        assert.notInclude(game.getPlayers(), players[0])
        assert.include(game.getPlayers(), players[1])
        assert.include(game.getPlayers(), players[2])

        // @ts-ignore
        assert.isTrue(consoleSpy.content.includes("Pet leaves the game"))
    });

    it('second player should leave a game', () => {
        const consoleSpy = new ConsoleSpy();
        const game = new Game(consoleSpy);
        const players: string[] = ['Pet', 'Ed', 'Chat']

        players.forEach((player) => game.add(player))

        game.roll(4)
        game.wasCorrectlyAnswered()
        game.roll(2)
        game.makeThePlayerQuit()

        assert.include(game.getPlayers(), players[0])
        assert.notInclude(game.getPlayers(), players[1])
        assert.include(game.getPlayers(), players[2])

        // @ts-ignore
        assert.isTrue(consoleSpy.content.includes("Ed leaves the game"))
    });

    it('player should leave prison', () => {
        const consoleSpy = new ConsoleSpy();
        const game = new Game(consoleSpy);
        const players: string[] = ['Pet', 'Ed', 'Chat']

        players.forEach((player) => game.add(player))

        game.roll(4)
        game.wrongAnswer()

        expect(game.getIsGettingOutOfPenaltyBox()).to.equals(false)
        expect(game.getInPenaltyBox()[0]).to.equals(true)

        game.roll(4)
        game.wasCorrectlyAnswered()
        expect(game.getIsGettingOutOfPenaltyBox()).to.equals(false)
        expect(game.getInPenaltyBox()[1]).to.equals(false)

        game.roll(4)
        game.wasCorrectlyAnswered()
        expect(game.getIsGettingOutOfPenaltyBox()).to.equals(false)
        expect(game.getInPenaltyBox()[2]).to.equals(false)

        game.roll(5)

        expect(game.getIsGettingOutOfPenaltyBox()).to.equals(true)
        expect(game.getInPenaltyBox()[0]).to.equals(false)

        // @ts-ignore
        assert.isTrue(consoleSpy.content.includes("Pet is getting out of the penalty box"))
    });
});
