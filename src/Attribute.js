const events = require('./events');

class Attribute {

    createAttributes(element, props) {
        const propsKeys = Object.keys(props || {});

        for(let i = 0, len = propsKeys.length; i < len; i++) {
            this.setAttribute(element, propsKeys[i], props[propsKeys[i]]);
        }
    }

    setAttribute(element, name, value) {
        const beforeAttributeSet = events.callBeforeAttributeSet(this, element, name, value);
        if (beforeAttributeSet === false) {
            return;
        } else if (beforeAttributeSet && typeof beforeAttributeSet === 'object') {
            name = beforeAttributeSet.hasOwnProperty(name) ? beforeAttributeSet.name : name;
            value = beforeAttributeSet.hasOwnProperty(value) ? beforeAttributeSet.value : value;
        }

        if (typeof value === 'object') {
            try {
                element.setAttribute(name, JSON.stringify(value));
            } catch (e) {

            }
        } else {
            if (value === undefined) value = '';
            element.setAttribute(name, value);
        }

        events.callAttributeSet(this, element, name, value);
    }

    removeAttribute(element, name) {
        if (events.callBeforeAttributeRemove(this, element, name) === false) {
            return;
        }
        element.removeAttribute(name);
    }

    updateAttributes(element, newProps, oldProps = {}) {
        const props = Object.assign({}, newProps, oldProps);
        let updated = [];
        Object.keys(props).forEach(name => {
            if(element.nodeType !== 1) return;

            let newVal = newProps[name];
            let oldVal = oldProps[name];

            if (newVal === '') {
                this.removeAttribute(element, name);
            } else if (oldVal === '' || newVal !== oldVal) {
                this.setAttribute(element, name, newVal);
            }

        });

        return updated;
    }

}

module.exports = Attribute;