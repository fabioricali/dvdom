function callNodeCreate(context, ...args) {
    if (typeof context.cfg.onNodeCreate === 'function') {
        context.cfg.onNodeCreate.apply(context, args);
    }
}

function callNodeRemove(context, ...args) {
    if (typeof context.cfg.onNodeRemove === 'function') {
        context.cfg.onNodeRemove.apply(context, args);
    }
}

function callNodeChange(context, ...args) {
    if (typeof context.cfg.onNodeChange === 'function') {
        context.cfg.onNodeChange.apply(context, args);
    }
}

function callBeforeNodeCreate(context, ...args) {
    if (typeof context.cfg.onBeforeNodeCreate === 'function') {
        return context.cfg.onBeforeNodeCreate.apply(context, args);
    }
}

function callBeforeNodeChange(context, ...args) {
    if (typeof context.cfg.onBeforeNodeChange === 'function') {
        return context.cfg.onBeforeNodeChange.apply(context, args);
    }
}

function callBeforeNodeRemove(context, ...args) {
    if (typeof context.cfg.onBeforeNodeRemove === 'function') {
        return context.cfg.onBeforeNodeRemove.apply(context, args);
    }
}

module.exports = {
    callNodeCreate,
    callNodeRemove,
    callNodeChange,
    callBeforeNodeCreate,
    callBeforeNodeChange,
    callBeforeNodeRemove
};