
export class NotEnoughPlayerError extends Error
{
    constructor() {
        super("test");
        this.name = "NotEnoughPlayerError"
    }

}
