import {Game} from './game';
import {ConsoleSpy} from "./ConsoleSpy";

export class GameRunner {
    public static main(): void {
        const consoleSpy = new ConsoleSpy();
        const game = new Game(consoleSpy);
        game.add("Chet");
        game.add("Pat");
        game.add("Sue");

        let notAWinner;
        do {

            try {
                game.roll(Math.floor(Math.random() * 6) + 1);

                if (Math.floor(Math.random() * 10) == 7) {
                    notAWinner = game.wrongAnswer();
                } else {
                    notAWinner = game.wasCorrectlyAnswered();
                }
            } catch (e) {
                console.log(e)
            }
        
        } while (notAWinner);
    }
}

GameRunner.main();

