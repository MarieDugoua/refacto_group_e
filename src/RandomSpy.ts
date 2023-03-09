import {IRandom} from "./IRandom";

export class RandomSpy implements IRandom {

    count:number = 0;
    random(): number {
        this.count++
        return (this.count%10)/10;

    }

}