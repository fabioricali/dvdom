const isChanged = require('./is-changed');
const events = require('./events');

class Vdom {

    constructor(cfg) {
        this.cfg = Object.assign({}, cfg);
    }

    create(root, node) {

        if (events.callBeforeNodeCreate(this, root, node) === false) {
            return false;
        }

        let element;

        if (node && typeof node === 'object') {
            // Creo l'elemento e lo metto nella root
            element = document.createElement(node.type);
        } else {
            // Creo l'elemento testo e lo metto nella root
            element = document.createTextNode(node);
        }

        events.callNodeCreate(this, element);

        // Scorro eventuali children
        if (Array.isArray(node.children))
            node.children.forEach(child => {
                this.update(element, child)
            });

        return root.appendChild(element);
    }

    remove(root, newNode, oldNode, index) {
        if (events.callBeforeNodeRemove(this, root.childNodes[index], {root, newNode, oldNode, index}) === false) {
            return;
        }

        // Elimino l'elemento
        let oldElement = root.removeChild(root.childNodes[index]);

        events.callNodeRemove(this, oldElement, {root, newNode, oldNode, index});
    }

    change(root, newNode, oldNode, index) {
        let oldElement = root.childNodes[index];
        let newElement = this.create(root, newNode);

        if (events.callBeforeNodeChange(this, newElement, oldElement, {root, newNode, oldNode, index}) === false) {
            return;
        }

        // Sostituisco il vecchio elemento con quello nuovo
        root.replaceChild(newElement, oldElement);

        events.callNodeChange(this, newElement, oldElement, {root, newNode, oldNode, index});
    }

    walk(root, newNode, oldNode, index) {
        if (!Array.isArray(newNode.children) || !Array.isArray(oldNode.children)) return;

        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;

        for (let i = 0; i < newLength || i < oldLength; i++) {
            this.update(
                root.childNodes[index],
                newNode.children[i],
                oldNode.children[i],
                i
            );
        }
    }

    update(root, newNode, oldNode, index = 0) {
        if (!root) return;

        if (!oldNode) {
            this.create(root, newNode);
        } else if (!newNode) {
            this.remove(root, newNode, oldNode, index);
        } else if (isChanged(newNode, oldNode)) {
            this.change(root, newNode, oldNode, index);
        } else if (newNode.type) {
            this.walk(root, newNode, oldNode, index);
        }
    }
}

module.exports = Vdom;