function isText(node) {
    // browser
    // node.nodeType === 3

    // nodejs
    return typeof node === 'string'
}

export default isText
