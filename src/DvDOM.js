/*
        this.type = name; // tag name
        this.props = Object.assign({}, props); //attributes
        this.children = [];
        this.isSVG = isSVG || REGEX.IS_SVG.test(name);
 */

function isChanged(nodeA, nodeB) {
    //console.log(nodeA, nodeB)
    return typeof nodeA !== typeof nodeB ||
        typeof nodeA === 'string' && nodeA !== nodeB ||
        nodeA.type !== nodeB.type ||
        nodeA.props && !!nodeA.props.forceupdate;
}

class DvDOM {

    constructor(cfg) {
        this.cfg = Object.assign({}, cfg);
    }

    create(root, node) {

        if (this.cfg.onBeforeNodeCreate && this.cfg.onBeforeNodeCreate(root, node) === false) {
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

        if (this.cfg.onNodeCreate) {
            this.cfg.onNodeCreate(element);
        }

        // Scorro eventuali children
        if (Array.isArray(node.children))
            node.children.forEach(child => {
                this.update(element, child)
            });

        return root.appendChild(element);
    }

    update(root, newNode, oldNode, index = 0) {

        if (!root) return;

        // L'elemento non esiste lo creo, perchè oldNode è null
        if (!oldNode) {
            this.create(root, newNode);
        } else if (!newNode) {

            if (this.cfg.onBeforeRemoveNode
                && this.cfg.onBeforeRemoveNode(root.childNodes[index], {root, newNode, oldNode, index}) === false) {
                return;
            }

            // Elimino l'elemento
            let oldElement = root.removeChild(root.childNodes[index]);

            if (this.cfg.onNodeRemove) {
                this.cfg.onNodeRemove(oldElement, {root, newNode, oldNode, index});
            }

        } else if (isChanged(newNode, oldNode)) {
            let oldElement = root.childNodes[index];
            let newElement = this.create(root, newNode);

            if (this.cfg.onBeforeNodeChange
                && this.cfg.onBeforeNodeChange(newElement, oldElement, {root, newNode, oldNode, index}) === false) {
                return;
            }

            // Sostituisco il vecchio elemento con quello nuovo
            root.replaceChild(newElement, oldElement);

            if (this.cfg.onNodeChange) {
                this.cfg.onNodeChange(newElement, oldElement, {root, newNode, oldNode, index});
            }

        } else if (newNode.type){

            if(!Array.isArray(newNode.children) || !Array.isArray(oldNode.children)) return;

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
    }


}

module.exports = DvDOM;