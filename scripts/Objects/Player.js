import { GameObject } from "./GameObject.js";

export class Player extends GameObject {
    constructor ({
        name = 'Player', 
        type = 'player', 
        position = {
            x: 0, 
            y: 0
        }, 
        status = 'standing', 
        movement = {
            direction: 'none', 
            previousDirection: 'none', 
            speed: 2
        }, 
        size = {
            width: 50, 
            height: 50
        }, 
        color = '#0000FF',
        interactive = {
            status : false,
            trigger: 'click',
            action: null
        }
    }) {
        super({ name, type, position, status, movement, size, color, interactive });
    }
}