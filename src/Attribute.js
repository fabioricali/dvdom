const events = require('./events');

class Attribute {

    createAttributes(element, props) {
        if (events.callBeforeAttributesCreate(this, element, props) === false) {
            return;
        }

        const propsKeys = Object.keys(props || {});

        for (let i = 0, len = propsKeys.length; i < len; i++) {
            if (this.setAttribute(element, propsKeys[i], props[propsKeys[i]])) {
                events.callAttributeCreate(this, element, propsKeys[i], props[propsKeys[i]]);
            }
        }

        events.callAttributesCreate(this, element, props);
    }

    setAttribute(element, name, value) {
        const beforeAttributeSet = events.callBeforeAttributeSet(this, element, name, value);

        if (beforeAttributeSet === false) {
            return;
        } else if (beforeAttributeSet && typeof beforeAttributeSet === 'object') {
            name = beforeAttributeSet.hasOwnProperty(name) ? beforeAttributeSet.name : name;
            value = beforeAttributeSet.hasOwnProperty(value) ? beforeAttributeSet.value : value;
        }

        if (!value && value !== 0)
            return;

        element.setAttribute(name, value);

        events.callAttributeSet(this, element, name, value);

        return true;
    }

    removeAttribute(element, name) {
        if (events.callBeforeAttributeRemove(this, element, name) === false) {
            return;
        }
        element.removeAttribute(name);

        events.callAttributeRemove(this, element, name);

        return true;
    }

    updateAttributes(element, newProps, oldProps = {}) {
        const props = Object.assign({}, newProps, oldProps);

        Object.keys(props).forEach(name => {
            if (element.nodeType !== 1) return;

            let newVal = newProps[name];
            let oldVal = oldProps[name];

            let isChanged = false;

            if (events.callBeforeAttributeChange(this, element, newVal, oldVal) === false) {
                return;
            }

            if (!newVal && newVal !== 0) {
                isChanged = this.removeAttribute(element, name);
            } else if (oldVal === '' || newVal !== oldVal) {
                isChanged = this.setAttribute(element, name, newVal);
            }

            if (isChanged) {
                events.callAttributeChange(this, element, newVal, oldVal);
            }

        });

    }

}

module.exports = Attribute;