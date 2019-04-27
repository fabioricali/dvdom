const Node = require('../src/Node');
const be = require('bejs');

describe('Attribute', function () {
    beforeEach(function () {
        document.body.innerHTML = '<div id="root"></div>';
    });

    it('should be ok', function () {
        new Node();
    });

    it('create first html element with props', function () {
        const dom = new Node();

        const newNode = {
            type: 'div',
            children: [],
            props: {
                class: 'my-style'
            },
            isSVG: false
        };

        dom.render(document.getElementById('root'), newNode, null);

        const result = document.body.innerHTML;

        console.log(result);

        be.err.equal('<div id="root"><div class="my-style"></div></div>', result)
    });
});