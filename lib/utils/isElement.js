import { isArray } from '../vendor/lodash.custom'

function isElement(node) {
    // browser
    // node.nodeType === 1

    // nodejs
    return Boolean(node && isArray(node))
}

export default isElement
