import {IConsole} from "./IConsole";

export class QuestionHub {
    private selectedQuestion: string;
    private isTechnoModeActivated: boolean = false;

    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockQuestions: Array<string> = [];
    private technoQuestions: Array<string> = [];



    constructor() {
        for (let i = 0; i < 50; i++) {
            this.popQuestions.push("Pop Question " + i);
            this.scienceQuestions.push("Science Question " + i);
            this.sportsQuestions.push("Sports Question " + i);
            this.technoQuestions.push("Techno Question " + i);
            this.rockQuestions.push(this.createRockQuestion(i));
        }
    }

    private createRockQuestion(index: number): string {
        return "Rock Question " + index;
    }


    askQuestion(currenPlayerPosition : number , iConsole : IConsole): void {
        if (this.selectedQuestion) {
            this.newQuestion(this.selectedQuestion, iConsole)
        } else {
            this.newQuestion(this.getCurrentCategory(currenPlayerPosition), iConsole)
        }
    }


    newQuestion(questionType : String, iConsole : IConsole) {
            if (questionType == 'Pop')
                iConsole.log(this.popQuestions.shift());
            if (questionType == 'Science')
                iConsole.log(this.scienceQuestions.shift());
            if (questionType == 'Sports')
                iConsole.log(this.sportsQuestions.shift());
            if (questionType == 'Rock')
                iConsole.log(this.rockQuestions.shift());
            if (questionType == 'Techno')
                iConsole.log(this.technoQuestions.shift());
    }

    getCurrentCategory(currentPlayerPLace : Number): string {
        if ( currentPlayerPLace == 0)
            return 'Pop';
        if (currentPlayerPLace == 4)
            return 'Pop';
        if (currentPlayerPLace == 8)
            return 'Pop';
        if (currentPlayerPLace == 1)
            return 'Science';
        if (currentPlayerPLace == 5)
            return 'Science';
        if (currentPlayerPLace == 9)
            return 'Science';
        if (currentPlayerPLace == 2)
            return 'Sports';
        if (currentPlayerPLace == 6)
            return 'Sports';
        if (currentPlayerPLace == 10)
            return 'Sports';
        if (this.isTechnoModeActivated)
            return 'Techno';
        return 'Rock';
    }

    activateTechnoQuestions(): void {
        this.isTechnoModeActivated = true;
    }

    setNextQuestion(questionType : string = prompt("Quel sera le prochain type de questions ? (Pop/Sports/Science/Techno/Rock)")) {
        this.selectedQuestion = questionType;
    }

}
