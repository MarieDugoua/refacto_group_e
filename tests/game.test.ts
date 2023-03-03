import {expect} from 'chai';
import {describe, it} from 'mocha';
import {GameRunner} from '../src/game-runner';
import {Game} from "../src/game";
import NotEnoughtPlayerError from "../src/NotEnoughtPlayerError";

describe('The test environment', () => {
    it('should pass', () => {
        expect(true).to.be.true;
    });

    it("should access game", function () {
        expect(GameRunner).to.not.be.undefined;
    });

    it("should not have less then 2 players to play the game", () => {
        const game = new Game()

        expect(() => game.roll(5)).to.throw(NotEnoughtPlayerError)

        game.add('Pet')

        expect(() => game.roll(5)).to.throw(NotEnoughtPlayerError)

        game.add('Ed')

        expect(() => game.roll(5)).not.to.throw(NotEnoughtPlayerError)
    })
});
