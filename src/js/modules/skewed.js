import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import img0 from '../../assets/christopher-campbell.jpg';
import img1 from '../../assets/jakob-owens.jpg';
import '../../assets/jernej-graj.jpg';
import '../../assets/max.jpg';

class Skewed {
    constructor() {

        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            resizeTo: window,
            antialias: true
        });
        
        this.app.stage.interactive = true;
        document.body.appendChild(this.app.view);

        this.container = new PIXI.Container();
        this.container.addChild(this.addImage(img1));

        this.addImage(img0);

        this.mask = new PIXI.Graphics();
        this.mask.lineStyle(0);

        this.app.stage.addChild(this.container);

        this.container.mask = this.mask;
    }

    addImage(img) {
        const bg = PIXI.Sprite.from(img);
        bg.anchor.set(0.5);

        bg.x = this.app.screen.width / 2;
        bg.y = this.app.screen.height / 2;

        this.app.stage.addChild(bg);

        return bg;
    }

    render() {
        let count = 0;

        this.app.ticker.add(() => {
            count += 0.02;

            this.mask.clear();

            this.mask.beginFill('#fff', 1);

            this.mask.moveTo(0, 0);
            this.mask.lineTo(this.app.screen.width, 0);
            this.mask.lineTo(this.app.screen.width, this.app.screen.height * Math.abs(Math.sin(count)));
            this.mask.lineTo(0, this.app.screen.height * Math.abs(Math.sin(count + 0.2)));
        });
    }

}

export default Skewed;