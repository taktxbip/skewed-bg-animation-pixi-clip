import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import img0 from '../../assets/christopher-campbell.jpg';
import '../../assets/jakob-owens.jpg';
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

        document.body.appendChild(this.app.view);

        this.app.stage.interactive = true;

        const bg = PIXI.Sprite.from(img0);

        bg.anchor.set(0.5);

        bg.x = this.app.screen.width / 2;
        bg.y = this.app.screen.height / 2;

        this.app.stage.addChild(bg);

        const container = new PIXI.Container();
        container.x = this.app.screen.width / 2;
        container.y = this.app.screen.height / 2;

        this.app.ticker.add(() => {
            bg.rotation += 0.01;
        });
    }
}

export default Skewed;