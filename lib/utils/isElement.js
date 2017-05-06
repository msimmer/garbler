function isElement(node) {
    // browser
    // node.nodeType === 1

    // nodejs
    return Boolean(node && node.constructor === Array)
}

export default isElement
