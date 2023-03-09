import { expect, assert } from 'chai';
import { describe, it } from 'mocha';
import { GameRunner } from '../src/game-runner';
import { Game } from "../src/game";
import NotEnoughtPlayerError from "../src/NotEnoughtPlayerError";
import {ConsoleSpy} from "../src/ConsoleSpy";

describe('The test environment', () => {
    it('should pass', () => {
        expect(true).to.be.true;
    });

    it("should access game", function () {
        expect(GameRunner).to.not.be.undefined;
    });

    it("should not have less then 2 players to play the game", () => {
        const consoleSpy = new ConsoleSpy();
        const game = new Game(consoleSpy);

        expect(() => game.roll(5)).to.throw(Error)

        game.add('Pet')

        expect(() => game.roll(5)).to.throw(Error)

        game.add('Ed')

        expect(() => game.roll(5)).not.to.throw(Error)
    })

    it("should not have less then 2 players to play the game", () => {
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

    it('player should leave a game', () => {
        const consoleSpy = new ConsoleSpy();
        const game = new Game(consoleSpy);
        const players: string[] = ['Pet', 'Ed', 'Chat']

        players.forEach((player) => game.add(player))

        game.roll(4)

        game.quit()

        assert.notInclude(game.getPlayers(), players[0])
        assert.include(game.getPlayers(), players[1])
        assert.include(game.getPlayers(), players[2])
    });

    it('second player should leave a game', () => {
        const consoleSpy = new ConsoleSpy();
        const game = new Game(consoleSpy);
        const players: string[] = ['Pet', 'Ed', 'Chat']

        players.forEach((player) => game.add(player))

        game.roll(4)
        game.wasCorrectlyAnswered()
        game.roll(2)
        game.quit()

        assert.include(game.getPlayers(), players[0])
        assert.notInclude(game.getPlayers(), players[1])
        assert.include(game.getPlayers(), players[2])
    });
});
