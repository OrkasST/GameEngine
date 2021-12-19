export class GameObject {
    constructor({
        name = 'StandartObject', 
        type = 'solid', 
        position = {
            x: 0, 
            y: 0
        }, 
        status = 'standing', 
        movement = {
            direction: 'none', 
            previousDirection: 'none', 
            speed: 0
        }, 
        size = {
            width: 10, 
            height: 10
        }, 
        color = '#000000', 
        AIType = null,
        interactive = {
            status : false,
            trigger: 'click',
            action: null
        }
    }) {
        this.name = name;
        this.type = type;
        this.position = position;
        this.status = status;
        this.movement = movement;
        this.size = size;
        this.color = color;
        this.AIType = AIType;
        if (this.AIType) this.AI = new AI({type: this.AIType});
        this.image = null;
        this.interactive = interactive;
        // this.collisionBody = {
        //     width:
        // }
    }



}