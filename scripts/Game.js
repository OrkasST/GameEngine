import { Controller } from "./Controller.js";
import { GameObject } from "./Objects/GameObject.js";
import { Player } from "./Objects/Player.js";
import { Screen } from "./Screen.js";

export class Game {
    constructor({ screen = null, data = [] }) {
        this.screen = screen || new Screen({});
        this.data = data;
        this.controller = new Controller([
            { code: "KeyM", action: "stop_player" },
            { code: "KeyW", action: "move_player_up" },
            { code: "KeyS", action: "move_player_down" },
            { code: "KeyA", action: "move_player_left" },
            { code: "KeyD", action: "move_player_right" },
            { code: "KeyQ", action: "create_object_moving" }
        ]);

    }

    init() {
        this.screen.setSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
        this.screen.camera.setModifiers();
        this.controller.addListener();
        this.player = this.data.length > 0 ? 
         this.data[this.data.length-1]
         : new Player({
            position: {
                x: 200,
                y: 200
            }
        });
        this.data.push(
            new GameObject({
                name: 'Cube', 
                status: 'moving', 
                movement: {
                    direction: 'right',
                    previousDirection: 'none',
                    speed: 3
                },
                size: {
                    width: 20,
                    height: 20
                }
            })
        );


        this.data.push(this.player);

        this.game(this.data);
    }

    game(data) {
        this.update(this.data);
        this.render(this.data);
        requestAnimationFrame( (time) => {
            this.game(this.data, time);
        });
    }

    update(data) {
        let actionList = this.controller.getActionList();
        if (actionList.length > 0) this.doActions(actionList);
        data.forEach(el => {
            switch (el.status) {
                case 'standing':
                    break;
                case 'moving':
                    this.move(el);
                    break;
                default: break;
            }
        });
        this.screen.camera.setFocus(this.player);
    }

    render(data) {
        this.screen.clear();
        data.forEach(el => {
            this.screen.drawObject(el);
        });
    }

    move(obj) {
        switch (obj.movement.direction) {
            case 'up':
                obj.position.y -= obj.movement.speed; break;
            case 'down':
                obj.position.y += obj.movement.speed; break;
            case 'left':
                obj.position.x -= obj.movement.speed; break;
            case 'right':
                obj.position.x += obj.movement.speed; break;
        }
    }

    doActions(list) {
        // debugger;
        list.forEach( el => {
            el = el.split('_');
            // debugger;
            switch (el[0]) {
                case 'move':
                    // debugger;
                    this[el[1]].status = 'moving';
                    this[el[1]].movement.direction = el[2];
                    this.log = true;
                    // debugger;
                    break;
                case 'create':
                    this.data.splice( this.data.length -1, 0,
                        new GameObject({
                            size: {
                                width: 20,
                                height: 20
                            },
                            position: {
                                x: Math.floor(this.player.position.x + (this.player.size.width/2)) - 10,
                                y: Math.floor(this.player.position.y + (this.player.size.height/2)) - 10
                            },
                            status: el[2],
                            movement: {
                                direction: this.player.movement.direction, 
                                previousDirection: 'none', 
                                speed: 4
                            },
                            color: '#00FF00'                       
                        })
                    )
            }
        });

        this.controller.clearActionList();
    }

    sceneChange(scene) {

    }

}