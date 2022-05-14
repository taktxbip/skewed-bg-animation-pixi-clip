'strict';

import Skewed from './js/modules/skewed';

import './scss/main.scss';

(function () {
    window.addEventListener('DOMContentLoaded', (e) => {
        const s = new Skewed();
        s.render();
    });
})();
