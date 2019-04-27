function callBeforeNodeCreate(context, ...args) {
    if (typeof context.cfg.onBeforeNodeCreate === 'function') {
        return context.cfg.onBeforeNodeCreate.apply(context, args);
    }
}

function callNodeCreate(context, ...args) {
    if (typeof context.cfg.onNodeCreate === 'function') {
        context.cfg.onNodeCreate.apply(context, args);
    }
}

function callBeforeNodeRemove(context, ...args) {
    if (typeof context.cfg.onBeforeNodeRemove === 'function') {
        return context.cfg.onBeforeNodeRemove.apply(context, args);
    }
}

function callNodeRemove(context, ...args) {
    if (typeof context.cfg.onNodeRemove === 'function') {
        context.cfg.onNodeRemove.apply(context, args);
    }
}

function callBeforeNodeChange(context, ...args) {
    if (typeof context.cfg.onBeforeNodeChange === 'function') {
        return context.cfg.onBeforeNodeChange.apply(context, args);
    }
}


function callNodeChange(context, ...args) {
    if (typeof context.cfg.onNodeChange === 'function') {
        context.cfg.onNodeChange.apply(context, args);
    }
}

function callBeforeAttributesCreate(context, ...args) {
    if (typeof context.cfg.onBeforeAttributesCreate === 'function') {
        return context.cfg.onBeforeAttributesCreate.apply(context, args);
    }
}

function callAttributesCreate(context, ...args) {
    if (typeof context.cfg.onAttributesCreate === 'function') {
        context.cfg.onAttributesCreate.apply(context, args);
    }
}

function callAttributeCreate(context, ...args) {
    if (typeof context.cfg.onAttributeCreate === 'function') {
        context.cfg.onAttributeCreate.apply(context, args);
    }
}

function callBeforeAttributeSet(context, ...args) {
    if (typeof context.cfg.onBeforeAttributeSet === 'function') {
        return context.cfg.onBeforeAttributeSet.apply(context, args);
    }
}

function callAttributeSet(context, ...args) {
    if (typeof context.cfg.onAttributeSet === 'function') {
        context.cfg.onAttributeSet.apply(context, args);
    }
}

function callBeforeAttributeRemove(context, ...args) {
    if (typeof context.cfg.onBeforeAttributeRemove === 'function') {
        return context.cfg.onBeforeAttributeRemove.apply(context, args);
    }
}

function callAttributeRemove(context, ...args) {
    if (typeof context.cfg.onAttributeRemove === 'function') {
        context.cfg.onAttributeRemove.apply(context, args);
    }
}

function callBeforeAttributeChange(context, ...args) {
    if (typeof context.cfg.onBeforeAttributeChange === 'function') {
        return context.cfg.onBeforeAttributeChange.apply(context, args);
    }
}

function callAttributeChange(context, ...args) {
    if (typeof context.cfg.onAttributeChange === 'function') {
        context.cfg.onAttributeChange.apply(context, args);
    }
}

module.exports = {
    callBeforeNodeCreate,
    callNodeCreate,
    callBeforeNodeRemove,
    callNodeRemove,
    callBeforeNodeChange,
    callNodeChange,
    callBeforeAttributesCreate,
    callAttributesCreate,
    callAttributeCreate,
    callBeforeAttributeSet,
    callAttributeSet,
    callBeforeAttributeRemove,
    callAttributeRemove,
    callBeforeAttributeChange,
    callAttributeChange
};