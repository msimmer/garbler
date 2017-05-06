function factory(settings, done) {
    let err = null

    let { nodes, walker } = settings
    let result = []

    try {
        nodes = Array.from(nodes) // arrays of text nodes
        result = nodes.map(walker) // parse
    } catch (e) {
        err = e
    }

    if (done && typeof done === 'function') {
        return done(err, result)
    }
    return err || result
}

export default factory
