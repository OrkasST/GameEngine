export class ImageLoader {
    constructor() {
        this.imagesToLoad = null;
        this.loadedImages = [];
        this.promises = [];
    }

    setImages(images) {
        this.imagesToLoad = images;
        this.loadedImages = [];
        this.promises = [];
    }

    loadImages() {
        for (let name in this.imagesToLoad) {
            this.promises.push( load(name, this.imagesToLoad[name]) );
        }
        return Promise.all(this.promises);
    }

    load (name, src) {
        return new Promise( (resolve, reject) => {
            const img = new Image();
            images[name] = img;
            img.onload = () => resolve(name);
            img.onerror = () => reject(error);
            img.src = src;
        });
    }
}