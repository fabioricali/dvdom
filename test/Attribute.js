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

    it('set and remove props', function () {
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

        let result = document.body.innerHTML;

        console.log(result);

        be.err.equal('<div id="root"><div class="my-style"></div></div>', result)

        dom.render(document.getElementById('root'), {
            type: 'div',
            children: [],
            props: {},
            isSVG: false
        }, newNode);

        result = document.body.innerHTML;

        console.log(result);

        be.err.equal('<div id="root"><div></div></div>', result)
    });

    it('set and remove props with other', function () {
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

        let result = document.body.innerHTML;

        console.log(result);

        be.err.equal('<div id="root"><div class="my-style"></div></div>', result)

        dom.render(document.getElementById('root'), {
            type: 'div',
            children: [],
            props: {
                title: 'hi'
            },
            isSVG: false
        }, newNode);

        result = document.body.innerHTML;

        console.log(result);

        be.err.equal('<div id="root"><div title="hi"></div></div>', result)
    });

    it('set props without true value and remove with false', function () {
        const dom = new Node();

        const newNode = {
            type: 'input',
            children: [],
            props: {
                disabled: true
            },
            isSVG: false
        };

        dom.render(document.getElementById('root'), newNode, null);

        let result = document.body.innerHTML;

        console.log(result);

        be.err.equal('<div id="root"><input disabled="true"></div>', result)

        dom.render(document.getElementById('root'), {
            type: 'input',
            children: [],
            props: {
                disabled: false
            },
            isSVG: false
        }, newNode);

        result = document.body.innerHTML;

        console.log(result);

        be.err.equal('<div id="root"><input></div>', result)
    });
});