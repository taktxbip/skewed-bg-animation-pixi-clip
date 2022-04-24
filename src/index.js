'strict';

import Highway from '@dogstudio/highway';
import Fade from './js/modules/fade';
import Shredder from './js/shredder';

import './scss/main.scss';

import img0 from './assets/jezael-melgoza.jpg';
import img1 from './assets/oleg-onchky.jpg';

(function () {
    window.addEventListener('DOMContentLoaded', (e) => {
        const H = new Highway.Core({
            transitions: {
                default: Fade
            }
        });

        const sh = new Shredder({
            container: '#container',
            currentSlide: 0,
            shreds: 50,
            speed: 0.5,
            images: [img0, img1]
        });
        sh.load();

    });
})();
