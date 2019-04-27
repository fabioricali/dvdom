const Node = require('../src/Node');
const be = require('bejs');

describe('Node', function () {
    beforeEach(function () {
        document.body.innerHTML = '<div id="root"></div>';
    });

    it('should be ok', function () {
        new Node();
    });

    it('createNode first html element', function () {
        const dom = new Node();

        const newNode = {
            type: 'div',
            children: [],
            props: {},
            isSVG: false
        };

        dom.render(document.getElementById('root'), newNode, null);

        const result = document.body.innerHTML;

        console.log(result);

        be.err.equal('<div id="root"><div></div></div>', result)
    });

    it('createNode inner html element', function () {
        const dom = new Node();

        const newNode = {
            type: 'div',
            children: [
                {
                    type: 'span',
                    children: [{
                        type: 'span',
                        children: [],
                        props: {},
                        isSVG: false
                    }],
                    props: {},
                    isSVG: false
                },
                {
                    type: 'span',
                    children: [{
                        type: 'span',
                        children: [],
                        props: {},
                        isSVG: false
                    }],
                    props: {},
                    isSVG: false
                }
            ],
            props: {},
            isSVG: false
        };

        dom.render(document.getElementById('root'), newNode, null);

        const result = document.body.innerHTML;

        console.log(result);

        be.err.equal('<div id="root"><div><span><span></span></span><span><span></span></span></div></div>', result)
    });

    it('createNode html element with text inside', function () {
        const dom = new Node();

        const newNode = {
            type: 'div',
            children: ['hello'],
            props: {},
            isSVG: false
        };

        dom.render(document.getElementById('root'), newNode, null);

        const result = document.body.innerHTML;

        console.log(result);

        be.err.equal('<div id="root"><div>hello</div></div>', result)
    });

    it('createNode html element with text inside and render it', function () {
        const dom = new Node();
        const root = document.getElementById('root');

        dom.render(root, {
            type: 'div',
            children: ['hello'],
            props: {},
            isSVG: false
        }, null);

        let result = document.body.innerHTML;
        console.log(result);
        be.err.equal('<div id="root"><div>hello</div></div>', result);

        dom.render(root, {
            type: 'div',
            children: ['ciao'],
            props: {},
            isSVG: false
        }, {
            type: 'div',
            children: ['hello'],
            props: {},
            isSVG: false
        });

        result = document.body.innerHTML;
        console.log(result);
        be.err.equal('<div id="root"><div>ciao</div></div>', result);
    });

    it('createNode html element with text inside and removeNode it after', function () {
        const dom = new Node();
        const root = document.getElementById('root');

        dom.render(root, {
            type: 'div',
            children: ['hello'],
            props: {},
            isSVG: false
        }, null);

        let result = document.body.innerHTML;
        console.log(result);
        be.err.equal('<div id="root"><div>hello</div></div>', result);

        dom.render(root, {
            type: 'div',
            children: [],
            props: {},
            isSVG: false
        }, {
            type: 'div',
            children: ['hello'],
            props: {},
            isSVG: false
        });

        result = document.body.innerHTML;
        console.log(result);
        be.err.equal('<div id="root"><div></div></div>', result);
    });

    it('createNode html element with text inside and render it with other element', function () {
        const dom = new Node();
        const root = document.getElementById('root');

        dom.render(root, {
            type: 'div',
            children: ['hello'],
            props: {},
            isSVG: false
        }, null);

        let result = document.body.innerHTML;
        console.log(result);
        be.err.equal('<div id="root"><div>hello</div></div>', result);

        dom.render(root, {
            type: 'div',
            children: [
                {
                    type: 'span',
                    children: ['ciao'],
                    props: {},
                    isSVG: false
                }
            ],
            props: {},
            isSVG: false
        }, {
            type: 'div',
            children: ['hello'],
            props: {},
            isSVG: false
        });

        result = document.body.innerHTML;
        console.log(result);
        be.err.equal('<div id="root"><div><span>ciao</span></div></div>', result);
    });

    it('createNode html element and render with the same nodes', function () {
        const vdom = new Node({
            onNodeCreate(node) {
                console.log('onNodeCreate', node)
            },
            onNodeChange(newNode, oldNode) {
                throw new Error('Node is changed');
            }
        });
        const root = document.getElementById('root');

        vdom.render(root, {
            type: 'div',
            children: ['hello'],
            props: {},
            isSVG: false
        }, null);

        let result = document.body.innerHTML;
        console.log(result);
        be.err.equal('<div id="root"><div>hello</div></div>', result);

        vdom.render(root, {
            type: 'div',
            children: ['hello'],
            props: {},
            isSVG: false
        }, {
            type: 'div',
            children: ['hello'],
            props: {},
            isSVG: false
        });

        result = document.body.innerHTML;
        console.log(result);
        be.err.equal('<div id="root"><div>hello</div></div>', result);
    });

    it('createNode html element list and removeNode an item', function () {
        let onCreate = 0;
        const vdom = new Node({
            onNodeCreate(node) {
                onCreate++;
                if (onCreate > 11)
                    throw new Error('Create must be 11');
                console.log('onNodeCreate', node);
            },
            onNodeChange(newNode, oldNode) {
                console.log('onNodeChange', newNode.textContent, oldNode.textContent);
                be.err.equal(newNode.textContent, '3 item');
                be.err.equal(oldNode.textContent, '2 item');
            }
        });
        const root = document.getElementById('root');

        vdom.render(root, {
            type: 'ul',
            children: [
                {
                    type: 'li',
                    children: ['1 item'],
                    props: {},
                    isSVG: false
                },
                {
                    type: 'li',
                    children: ['2 item'],
                    props: {},
                    isSVG: false
                },
                {
                    type: 'li',
                    children: ['3 item'],
                    props: {},
                    isSVG: false
                },
            ],
            props: {},
            isSVG: false
        }, null);

        let result = document.body.innerHTML;
        console.log(result);
        be.err.equal('<div id="root"><ul><li>1 item</li><li>2 item</li><li>3 item</li></ul></div>', result);

        vdom.render(root, {
            type: 'ul',
            children: [
                {
                    type: 'li',
                    children: ['1 item'],
                    props: {},
                    isSVG: false
                },
                {
                    type: 'li',
                    children: ['3 item'],
                    props: {},
                    isSVG: false
                },
            ],
            props: {},
            isSVG: false
        }, {
            type: 'ul',
            children: [
                {
                    type: 'li',
                    children: ['1 item'],
                    props: {},
                    isSVG: false
                },
                {
                    type: 'li',
                    children: ['2 item'],
                    props: {},
                    isSVG: false
                },
                {
                    type: 'li',
                    children: ['3 item'],
                    props: {},
                    isSVG: false
                },
            ],
            props: {},
            isSVG: false
        });

        result = document.body.innerHTML;
        console.log(result);
        be.err.equal('<div id="root"><ul><li>1 item</li><li>3 item</li></ul></div>', result);
    });

    it('createNode html element list with other element and removeNode an item', function () {
        let onCreate = 0;
        const vdom = new Node({
            onNodeCreate(node) {
                onCreate++;
                if (onCreate > 11)
                    throw new Error('Create must be 11');
                console.log('onNodeCreate', node, onCreate);
            },
            onNodeChange(newNode, oldNode) {
                console.log('onNodeChange', newNode.textContent, oldNode.textContent);
            },
            onNodeRemove(oldNode) {
                console.log('onNodeRemove', oldNode);
            }
        });
        const root = document.getElementById('root');

        const initialNode = {
            type: 'ul',
            children: [
                {
                    type: 'li',
                    children: [{
                        type: 'span',
                        children: ['1 item'],
                        props: {},
                        isSVG: false
                    }],
                    props: {},
                    isSVG: false
                },
                {
                    type: 'li',
                    children: [{
                        type: 'span',
                        children: ['2 item'],
                        props: {},
                        isSVG: false
                    }],
                    props: {},
                    isSVG: false
                },
                {
                    type: 'li',
                    children: [{
                        type: 'span',
                        children: ['3 item'],
                        props: {},
                        isSVG: false
                    }],
                    props: {},
                    isSVG: false
                },
            ],
            props: {},
            isSVG: false
        };

        vdom.render(root, initialNode, null);

        let result = document.body.innerHTML;
        console.log(result);
        be.err.equal('<div id="root"><ul><li><span>1 item</span></li><li><span>2 item</span></li><li><span>3 item</span></li></ul></div>', result);

        vdom.render(root, {
            type: 'ul',
            children: [
                {
                    type: 'li',
                    children: [{
                        type: 'span',
                        children: ['1 item'],
                        props: {},
                        isSVG: false
                    }],
                    props: {},
                    isSVG: false
                },
                {
                    type: 'li',
                    children: [{
                        type: 'span',
                        children: ['3 item'],
                        props: {},
                        isSVG: false
                    }],
                    props: {},
                    isSVG: false
                },
            ],
            props: {},
            isSVG: false
        }, initialNode);

        result = document.body.innerHTML;
        console.log(result);
        be.err.equal('<div id="root"><ul><li><span>1 item</span></li><li><span>3 item</span></li></ul></div>', result);
    });

    it('createNode html element list with custom element and removeNode an item', function () {
        let onCreate = 0;
        const vdom = new Node({
            onNodeCreate(node) {
                onCreate++;
                if (onCreate > 11)
                    throw new Error('Create must be 11');
                console.log('onNodeCreate', node, onCreate);
            },
            onNodeChange(newNode, oldNode) {
                console.log('onNodeChange', newNode.textContent, oldNode.textContent);
                be.err.equal(newNode.textContent, '3 item');
                be.err.equal(oldNode.textContent, '2 item');
            },
            onNodeRemove(oldNode) {
                console.log('onNodeRemove', oldNode);
            }
        });
        const root = document.getElementById('root');

        const initialNode = {
            type: 'ul',
            children: [
                {
                    type: 'li',
                    children: [{
                        type: 'a-custom',
                        children: [],
                        props: {},
                        isSVG: false
                    }],
                    props: {},
                    isSVG: false
                },
                {
                    type: 'li',
                    children: [{
                        type: 'a-custom',
                        children: [],
                        props: {},
                        isSVG: false
                    }],
                    props: {},
                    isSVG: false
                },
                {
                    type: 'li',
                    children: [{
                        type: 'a-custom',
                        children: [],
                        props: {},
                        isSVG: false
                    }],
                    props: {},
                    isSVG: false
                },
            ],
            props: {},
            isSVG: false
        };

        vdom.render(root, initialNode, null);

        let result = document.body.innerHTML;
        console.log(result);
        be.err.equal('<div id="root"><ul><li><a-custom></a-custom></li><li><a-custom></a-custom></li><li><a-custom></a-custom></li></ul></div>', result);

        vdom.render(root, {
            type: 'ul',
            children: [
                {
                    type: 'li',
                    children: [{
                        type: 'a-custom',
                        children: [],
                        props: {},
                        isSVG: false
                    }],
                    props: {},
                    isSVG: false
                },
                {
                    type: 'li',
                    children: [{
                        type: 'a-custom',
                        children: [],
                        props: {},
                        isSVG: false
                    }],
                    props: {},
                    isSVG: false
                },
            ],
            props: {},
            isSVG: false
        }, initialNode);

        result = document.body.innerHTML;
        console.log(result);
        be.err.equal('<div id="root"><ul><li><a-custom></a-custom></li><li><a-custom></a-custom></li></ul></div>', result);
    });
});