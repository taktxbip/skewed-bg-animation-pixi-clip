import * as PIXI from 'pixi.js';
import gsap, { Power3 } from 'gsap';

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

        this.windowAspect = this.app.screen.width / this.app.screen.height;

        this.container = new PIXI.Container();
        this.mask = new PIXI.Graphics();

        const loader = new PIXI.Loader();
        loader.add('first', img0);
        loader.add('second', img1);

        loader.load((loader, resources) => {
            this.addImage(resources.first.texture);
            this.container.addChild(this.addImage(resources.second.texture));
            this.mask.lineStyle(0);

            this.app.stage.addChild(this.container);

            this.container.mask = this.mask;
            this.events();
        });
    }

    addImage(img) {
        const bg = PIXI.Sprite.from(img);

        const imageAspect = bg.width / bg.height;

        if (this.windowAspect > imageAspect) {
            bg.width = this.app.screen.width;
            bg.height = this.app.screen.width / imageAspect;
        } else {
            bg.height = this.app.screen.height;
            bg.width = this.app.screen.height * imageAspect;
        }

        bg.anchor.set(0.5);

        bg.x = this.app.screen.width / 2;
        bg.y = this.app.screen.height / 2;

        this.app.stage.addChild(bg);

        return bg;
    }

    events() {
        const body = document.querySelector('body');
        body.addEventListener('click', () => {
            const { width, height } = this.app.screen;
            const tl = gsap.timeline();
            let obj = {
                a: 0
            };
            this.app.stage.children[1].transform.pivot.x = width / 2;
            this.app.stage.children[1].transform.pivot.y = height / 2;
            this.app.stage.children[1].transform.position.x = width / 2;
            this.app.stage.children[1].transform.position.y = height / 2;

            this.app.stage.children[1].transform.position.y -= 100;
            tl
                .to(obj, {
                    a: 1,
                    duration: 1.2,
                    ease: Power3.easeOut,
                    onUpdate: () => {
                        const left = height * obj.a;
                        const right = left * obj.a;
                        const center = (left + right) * 0.5;

                        const rectHide = `rect(${center}px, ${width}px, ${height}px, 0)`;
                        const one = document.querySelector('.one');
                        one.style.clip = rectHide;

                        const rectShow = `rect(0, ${width}px, ${center}px, 0)`;
                        const two = document.querySelector('.two');
                        two.style.clip = rectShow;

                        this.mask.clear();
                        this.mask.beginFill('#fff', 1);
                        this.mask.moveTo(0, 0);
                        this.mask.lineTo(width, 0);
                        this.mask.lineTo(width, right);
                        this.mask.lineTo(0, left);
                    }
                })
                .to(this.app.stage.children[0].transform.position, {
                    y: '+=100',
                    duration: 1.2,
                    ease: Power3.easeOut
                }, 0)
                .to(this.app.stage.children[1].transform.position, {
                    y: '+=100',
                    duration: 1.2,
                    ease: Power3.easeOut
                }, 0)
                .to(this.app.stage.children[1].transform.scale, {
                    x: '+=0.1',
                    y: '+=0.1',
                    duration: 3,
                    ease: Power3.easeOut
                }, 0.3);
        });
    }

    // render() {
    //     this.app.ticker.add(() => {
    //         // this.mask.clear();
    //         // this.mask.beginFill('#fff', 1);

    //         // this.mask.moveTo(0, 0);
    //         // this.mask.lineTo(this.app.screen.width, 0);
    //         // this.mask.lineTo(this.app.screen.width, this.app.screen.height * Math.abs(Math.sin(count)));
    //         // this.mask.lineTo(0, this.app.screen.height * Math.abs(Math.sin(count + 0.2)));
    //     });
    // }

}

export default Skewed;