import { expect, assert } from 'chai';
import { describe, it } from 'mocha';
import { GameRunner } from '../src/game-runner';
import { Game } from "../src/game";
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

    it('should a player use a joker card', function () {
        const consoleSpy = new ConsoleSpy();
        const game = new Game(consoleSpy);
        const players: string[] = ['Pet', 'Ed', 'Chat']

        players.forEach((player) => game.add(player))

        game.roll(4)
        game.useJokerCard()

        expect(consoleSpy.content).to.contain('Pet use a Joker')
        expect(consoleSpy.content).to.contain('Answer was correct!!!!')
    });

    it('should give no gold when player use joker card', function () {
        const consoleSpy = new ConsoleSpy();
        const game = new Game(consoleSpy);
        const players: string[] = ['Pet', 'Ed', 'Chat']

        players.forEach((player) => game.add(player))
        const purses = game.purses

        game.roll(4)
        game.useJokerCard()

        expect(game.purses[0]).to.be.equals(0);
        expect(consoleSpy.content).to.not.contain(`Pet now has ${purses[0]}  Gold Coins.`)
    });

    it('2 different players should be able to use a joker card', function () {
        const consoleSpy = new ConsoleSpy();
        const game = new Game(consoleSpy);
        const players: string[] = ['Pet', 'Ed', 'Chat']

        players.forEach((player) => game.add(player))

        game.roll(4)
        game.useJokerCard()

        expect(consoleSpy.content).to.contain('Pet use a Joker')

        game.roll(4)
        game.useJokerCard()

        expect(consoleSpy.content).to.contain('Ed use a Joker')
    });

    it('should a player not use a joker card twice per games', function () {
        const consoleSpy = new ConsoleSpy();
        const game = new Game(consoleSpy);
        const players: string[] = ['Pet', 'Ed', 'Chat']

        players.forEach((player) => game.add(player))

        game.roll(4)
        game.useJokerCard()

        expect(consoleSpy.content).to.contain('Answer was correct!!!!')

        game.roll(4)
        game.wasCorrectlyAnswered()
        game.roll(4)
        game.wasCorrectlyAnswered()

        game.roll(4)
        game.useJokerCard()

        expect(consoleSpy.content).to.contain("Can't use a Joker twice")
    });

    it('if techno mode is activated should ask techno questions', () => {
        const consoleSpy = new ConsoleSpy();
        const game = new Game(consoleSpy);
        const players: string[] = ['Pet', 'Ed']

        players.forEach((player) => game.add(player))
        game.activateTechnoQuestions()

        game.roll(3)
        game.wasCorrectlyAnswered()

        expect(consoleSpy.content).to.include("Techno");
    });

    it('if techno mode is not activated should ask rock questions', () => {
        const consoleSpy = new ConsoleSpy();
        const game = new Game(consoleSpy);
        const players: string[] = ['Pet', 'Ed']

        players.forEach((player) => game.add(player))

        game.roll(3)
        game.wasCorrectlyAnswered()

        expect(consoleSpy.content).to.include("Rock");
    });

    it('question distribution should be fair', () => {
        const consoleSpy = new ConsoleSpy();
        const game = new Game(consoleSpy);
        const players: string[] = ['Pet', 'Ed']

        players.forEach((player) => game.add(player))

        game.roll(2);
        game.wasCorrectlyAnswered();

        assert.notInclude(consoleSpy.content,"Pet's new location is NaN");
        assert.notInclude(consoleSpy.content,"Pet now has NaN Gold Coins.");
        assert.include(consoleSpy.content,"Pet's new location is 2");
        assert.include(consoleSpy.content,"Pet now has 1 Gold Coins.");
    });
});
