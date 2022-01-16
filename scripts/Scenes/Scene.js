export class Scene {
    constructor({
        background = {
            width: window.innerWidth,
            height: window.innerHeight
        },
        objects = {
            main: {
                text: {
                    font: '40px TimesNewRoman',
                    color: '#FFFFFF',
                    x: 100,
                    y: 100,
                    text: 'Loading...'
                }
            }
        },
        time = 2000
    }) {
        this.background = background;
        this.objects = objects;
        this.time = time;
    }
}