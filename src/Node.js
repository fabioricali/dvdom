const events = require('./events');
const Attribute = require('./Attribute');

class Node extends Attribute {

    constructor(cfg) {
        super();
        this.cfg = Object.assign({}, cfg);
    }

    createNode(root, vNode) {

        if (events.callBeforeNodeCreate(this, root, vNode) === false) {
            return false;
        }

        let element;

        if (vNode && typeof vNode === 'object') {
            element = vNode.isSVG
                ? document.createElementNS('http://www.w3.org/2000/svg', vNode.type)
                : document.createElement(vNode.type);
        } else {
            element = document.createTextNode(vNode);
        }

        this.createAttributes(element, vNode.props);

        events.callNodeCreate(this, element);

        // Scorro eventuali children
        if (Array.isArray(vNode.children))
            vNode.children.forEach(child => {
                this.render(element, child)
            });

        return root.appendChild(element);
    }

    removeNode(root, newVnode, oldVnode, index) {
        if (events.callBeforeNodeRemove(this, root.childNodes[index], {root, newVnode, oldVnode, index}) === false) {
            return;
        }

        // Elimino l'elemento
        let oldElement = root.removeChild(root.childNodes[index]);

        events.callNodeRemove(this, oldElement, {root, newVnode, oldVnode, index});
    }

    changeNode(root, newVnode, oldVnode, index) {
        let oldElement = root.childNodes[index];
        let newElement = this.createNode(root, newVnode);

        if (events.callBeforeNodeChange(this, newElement, oldElement, {root, newVnode, oldVnode, index}) === false) {
            return;
        }

        // Sostituisco il vecchio elemento con quello nuovo
        root.replaceChild(newElement, oldElement);

        events.callNodeChange(this, newElement, oldElement, {root, newVnode, oldVnode, index});
    }

    walk(root, newVnode, oldVnode, index) {
        if (!Array.isArray(newVnode.children) || !Array.isArray(oldVnode.children)) return;

        this.updateAttributes(
            root.childNodes[index],
            newVnode.props,
            oldVnode.props
        );

        const newLength = newVnode.children.length;
        const oldLength = oldVnode.children.length;

        for (let i = 0; i < newLength || i < oldLength; i++) {
            this.render(
                root.childNodes[index],
                newVnode.children[i],
                oldVnode.children[i],
                i
            );
        }
    }

    render(root, newVnode, oldVnode, index = 0) {
        if (!root) return;

        if (!oldVnode) {
            this.createNode(root, newVnode);
        } else if (!newVnode) {
            this.removeNode(root, newVnode, oldVnode, index);
        } else if (this.constructor.isChanged(newVnode, oldVnode)) {
            this.changeNode(root, newVnode, oldVnode, index);
        } else if (newVnode.type) {
            this.walk(root, newVnode, oldVnode, index);
        }
    }

    static isChanged(vNodeA, vNodeB) {
        return typeof vNodeA !== typeof vNodeB ||
            typeof vNodeA === 'string' && vNodeA !== vNodeB ||
            vNodeA.type !== vNodeB.type ||
            vNodeA.props && !!vNodeA.props.forceupdate;
    }
}

module.exports = Node;