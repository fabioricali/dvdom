/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/Attribute.js":
/*!**************************!*\
  !*** ./src/Attribute.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const events = __webpack_require__(/*! ./events */ \"./src/events.js\");\r\n\r\nclass Attribute {\r\n\r\n    createAttributes(element, props) {\r\n        if (events.callBeforeAttributesCreate(this, element, props) === false) {\r\n            return;\r\n        }\r\n\r\n        const propsKeys = Object.keys(props || {});\r\n\r\n        for(let i = 0, len = propsKeys.length; i < len; i++) {\r\n            if(this.setAttribute(element, propsKeys[i], props[propsKeys[i]])) {\r\n                events.callAttributeCreate(this, element, propsKeys[i], props[propsKeys[i]]);\r\n            }\r\n        }\r\n\r\n        events.callAttributesCreate(this, element, props);\r\n    }\r\n\r\n    setAttribute(element, name, value) {\r\n        const beforeAttributeSet = events.callBeforeAttributeSet(this, element, name, value);\r\n        if (beforeAttributeSet === false) {\r\n            return;\r\n        } else if (beforeAttributeSet && typeof beforeAttributeSet === 'object') {\r\n            name = beforeAttributeSet.hasOwnProperty(name) ? beforeAttributeSet.name : name;\r\n            value = beforeAttributeSet.hasOwnProperty(value) ? beforeAttributeSet.value : value;\r\n        }\r\n\r\n        if (typeof value === 'object') {\r\n            try {\r\n                element.setAttribute(name, JSON.stringify(value));\r\n            } catch (e) {\r\n\r\n            }\r\n        } else {\r\n            if (value === undefined) value = '';\r\n            element.setAttribute(name, value);\r\n        }\r\n\r\n        events.callAttributeSet(this, element, name, value);\r\n\r\n        return true;\r\n    }\r\n\r\n    removeAttribute(element, name) {\r\n        if (events.callBeforeAttributeRemove(this, element, name) === false) {\r\n            return;\r\n        }\r\n        element.removeAttribute(name);\r\n\r\n        events.callAttributeRemove(this, element, name);\r\n\r\n        return true;\r\n    }\r\n\r\n    updateAttributes(element, newProps, oldProps = {}) {\r\n        const props = Object.assign({}, newProps, oldProps);\r\n\r\n        Object.keys(props).forEach(name => {\r\n            if(element.nodeType !== 1) return;\r\n\r\n            let newVal = newProps[name];\r\n            let oldVal = oldProps[name];\r\n\r\n            let isChanged = false;\r\n\r\n            if (events.callBeforeAttributeChange(this, element, newVal, oldVal) === false) {\r\n                return;\r\n            }\r\n\r\n            if (newVal === '') {\r\n                isChanged = this.removeAttribute(element, name);\r\n            } else if (oldVal === '' || newVal !== oldVal) {\r\n                isChanged = this.setAttribute(element, name, newVal);\r\n            }\r\n\r\n            if (isChanged) {\r\n                events.callAttributeChange(this, element, newVal, oldVal);\r\n            }\r\n\r\n        });\r\n\r\n    }\r\n\r\n}\r\n\r\nmodule.exports = Attribute;\n\n//# sourceURL=webpack:///./src/Attribute.js?");

/***/ }),

/***/ "./src/Node.js":
/*!*********************!*\
  !*** ./src/Node.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const events = __webpack_require__(/*! ./events */ \"./src/events.js\");\r\nconst Attribute = __webpack_require__(/*! ./Attribute */ \"./src/Attribute.js\");\r\n\r\nclass Node extends Attribute {\r\n\r\n    constructor(cfg) {\r\n        super();\r\n        this.cfg = Object.assign({}, cfg);\r\n    }\r\n\r\n    createNode(root, vNode) {\r\n\r\n        if (events.callBeforeNodeCreate(this, root, vNode) === false) {\r\n            return false;\r\n        }\r\n\r\n        let element;\r\n\r\n        if (vNode && typeof vNode === 'object') {\r\n            element = vNode.isSVG\r\n                ? document.createElementNS('http://www.w3.org/2000/svg', vNode.type)\r\n                : document.createElement(vNode.type);\r\n        } else {\r\n            element = document.createTextNode(vNode);\r\n        }\r\n\r\n        this.createAttributes(element, vNode.props);\r\n\r\n        events.callNodeCreate(this, element);\r\n\r\n        // Scorro eventuali children\r\n        if (Array.isArray(vNode.children))\r\n            vNode.children.forEach(vChild => {\r\n                this.createNode(element, vChild)\r\n            });\r\n\r\n        return root.appendChild(element);\r\n    }\r\n\r\n    removeNode(root, newVnode, oldVnode, index) {\r\n        if (events.callBeforeNodeRemove(this, root.childNodes[index], {root, newVnode, oldVnode, index}) === false) {\r\n            return;\r\n        }\r\n\r\n        // Elimino l'elemento\r\n        let oldElement = root.removeChild(root.childNodes[index]);\r\n\r\n        events.callNodeRemove(this, oldElement, {root, newVnode, oldVnode, index});\r\n    }\r\n\r\n    changeNode(root, newVnode, oldVnode, index) {\r\n        let oldElement = root.childNodes[index];\r\n        let newElement = this.createNode(root, newVnode);\r\n\r\n        if (events.callBeforeNodeChange(this, newElement, oldElement, {root, newVnode, oldVnode, index}) === false) {\r\n            return;\r\n        }\r\n\r\n        // Sostituisco il vecchio elemento con quello nuovo\r\n        root.replaceChild(newElement, oldElement);\r\n\r\n        events.callNodeChange(this, newElement, oldElement, {root, newVnode, oldVnode, index});\r\n    }\r\n\r\n    walk(root, newVnode, oldVnode, index) {\r\n        if (!Array.isArray(newVnode.children) || !Array.isArray(oldVnode.children)) return;\r\n\r\n        this.updateAttributes(\r\n            root.childNodes[index],\r\n            newVnode.props,\r\n            oldVnode.props\r\n        );\r\n\r\n        const newLength = newVnode.children.length;\r\n        const oldLength = oldVnode.children.length;\r\n\r\n        for (let i = 0; i < newLength || i < oldLength; i++) {\r\n            this.render(\r\n                root.childNodes[index],\r\n                newVnode.children[i],\r\n                oldVnode.children[i],\r\n                i\r\n            );\r\n        }\r\n    }\r\n\r\n    render(root, newVnode, oldVnode, index = 0) {\r\n        if (!root) return;\r\n\r\n        if (!oldVnode) {\r\n            this.createNode(root, newVnode);\r\n        } else if (!newVnode) {\r\n            this.removeNode(root, newVnode, oldVnode, index);\r\n        } else if (this.constructor.isChanged(newVnode, oldVnode)) {\r\n            this.changeNode(root, newVnode, oldVnode, index);\r\n        } else if (newVnode.type) {\r\n            this.walk(root, newVnode, oldVnode, index);\r\n        }\r\n    }\r\n\r\n    static isChanged(vNodeA, vNodeB) {\r\n        return typeof vNodeA !== typeof vNodeB ||\r\n            typeof vNodeA === 'string' && vNodeA !== vNodeB ||\r\n            vNodeA.type !== vNodeB.type ||\r\n            vNodeA.props && !!vNodeA.props.forceupdate;\r\n    }\r\n}\r\n\r\nmodule.exports = Node;\n\n//# sourceURL=webpack:///./src/Node.js?");

/***/ }),

/***/ "./src/events.js":
/*!***********************!*\
  !*** ./src/events.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function callBeforeNodeCreate(context, ...args) {\r\n    if (typeof context.cfg.onBeforeNodeCreate === 'function') {\r\n        return context.cfg.onBeforeNodeCreate.apply(context, args);\r\n    }\r\n}\r\n\r\nfunction callNodeCreate(context, ...args) {\r\n    if (typeof context.cfg.onNodeCreate === 'function') {\r\n        context.cfg.onNodeCreate.apply(context, args);\r\n    }\r\n}\r\n\r\nfunction callBeforeNodeRemove(context, ...args) {\r\n    if (typeof context.cfg.onBeforeNodeRemove === 'function') {\r\n        return context.cfg.onBeforeNodeRemove.apply(context, args);\r\n    }\r\n}\r\n\r\nfunction callNodeRemove(context, ...args) {\r\n    if (typeof context.cfg.onNodeRemove === 'function') {\r\n        context.cfg.onNodeRemove.apply(context, args);\r\n    }\r\n}\r\n\r\nfunction callBeforeNodeChange(context, ...args) {\r\n    if (typeof context.cfg.onBeforeNodeChange === 'function') {\r\n        return context.cfg.onBeforeNodeChange.apply(context, args);\r\n    }\r\n}\r\n\r\n\r\nfunction callNodeChange(context, ...args) {\r\n    if (typeof context.cfg.onNodeChange === 'function') {\r\n        context.cfg.onNodeChange.apply(context, args);\r\n    }\r\n}\r\n\r\nfunction callBeforeAttributesCreate(context, ...args) {\r\n    if (typeof context.cfg.onBeforeAttributesCreate === 'function') {\r\n        return context.cfg.onBeforeAttributesCreate.apply(context, args);\r\n    }\r\n}\r\n\r\nfunction callAttributesCreate(context, ...args) {\r\n    if (typeof context.cfg.onAttributesCreate === 'function') {\r\n        context.cfg.onAttributesCreate.apply(context, args);\r\n    }\r\n}\r\n\r\nfunction callAttributeCreate(context, ...args) {\r\n    if (typeof context.cfg.onAttributeCreate === 'function') {\r\n        context.cfg.onAttributeCreate.apply(context, args);\r\n    }\r\n}\r\n\r\nfunction callBeforeAttributeSet(context, ...args) {\r\n    if (typeof context.cfg.onBeforeAttributeSet === 'function') {\r\n        return context.cfg.onBeforeAttributeSet.apply(context, args);\r\n    }\r\n}\r\n\r\nfunction callAttributeSet(context, ...args) {\r\n    if (typeof context.cfg.onAttributeSet === 'function') {\r\n        context.cfg.onAttributeSet.apply(context, args);\r\n    }\r\n}\r\n\r\nfunction callBeforeAttributeRemove(context, ...args) {\r\n    if (typeof context.cfg.onBeforeAttributeRemove === 'function') {\r\n        return context.cfg.onBeforeAttributeRemove.apply(context, args);\r\n    }\r\n}\r\n\r\nfunction callAttributeRemove(context, ...args) {\r\n    if (typeof context.cfg.onAttributeRemove === 'function') {\r\n        context.cfg.onAttributeRemove.apply(context, args);\r\n    }\r\n}\r\n\r\nfunction callBeforeAttributeChange(context, ...args) {\r\n    if (typeof context.cfg.onBeforeAttributeChange === 'function') {\r\n        return context.cfg.onBeforeAttributeChange.apply(context, args);\r\n    }\r\n}\r\n\r\nfunction callAttributeChange(context, ...args) {\r\n    if (typeof context.cfg.onAttributeChange === 'function') {\r\n        context.cfg.onAttributeChange.apply(context, args);\r\n    }\r\n}\r\n\r\nmodule.exports = {\r\n    callBeforeNodeCreate,\r\n    callNodeCreate,\r\n    callBeforeNodeRemove,\r\n    callNodeRemove,\r\n    callBeforeNodeChange,\r\n    callNodeChange,\r\n    callBeforeAttributesCreate,\r\n    callAttributesCreate,\r\n    callAttributeCreate,\r\n    callBeforeAttributeSet,\r\n    callAttributeSet,\r\n    callBeforeAttributeRemove,\r\n    callAttributeRemove,\r\n    callBeforeAttributeChange,\r\n    callAttributeChange\r\n};\n\n//# sourceURL=webpack:///./src/events.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {module.exports = global.VNode = __webpack_require__(/*! ./Node */ \"./src/Node.js\");\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });