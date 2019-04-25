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
    _create(root, node) {

        let $el;

        if (typeof node === 'string') {
            $el = document.createTextNode(node);
        } else {
            $el = document.createElement(node.type);
            node.children
                .map(item => this.create(root, item))
                .forEach($el.appendChild.bind($el));
        }

        if (this.cfg.onCreateNode) {
            this.cfg.onCreateNode($el);
        }

        return root.appendChild($el);
    }

    create(root, node) {
        let element;

        if (node && typeof node === 'object') {

            // Creo l'elemento e lo metto nella root
            element = document.createElement(node.type);

            // Scorro eventuali children
            node.children.forEach(child => {
                this.update(element, child)
            });

        } else {
            // Creo l'elemento testo e lo metto nella root
            element = document.createTextNode(node);
        }

        if (this.cfg.onCreateNode) {
            this.cfg.onCreateNode(element);
        }

        return root.appendChild(element);
    }

    update(root, newNode, oldNode, index = 0) {

        if (!root) return;

        // L'elemento non esiste lo creo, perchè oldNode è null
        if (!oldNode) {
            this.create(root, newNode);
        } else if (!newNode) {
            // Elimino l'elemento
            let oldElement = root.removeChild(root.childNodes[index]);

            if (this.cfg.onRemoveNode) {
                this.cfg.onRemoveNode(oldElement);
            }

        } else if (isChanged(newNode, oldNode)) {
            let oldElement = root.childNodes[index];
            let newElement = this.create(root, newNode);

            if (this.cfg.onBeforeChangeNode) {
                this.cfg.onBeforeChangeNode(newElement, oldElement);
            }

            root.replaceChild(newElement, oldElement);

            if (this.cfg.onChangeNode) {
                this.cfg.onChangeNode(newElement, oldElement);
            }

        } else if (newNode.type){

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