import factory from './factory'

function walker(_nodes) {
    return _nodes
}

function replaceNodeValues(options = {}, done) {
    const defaults = { walker, nodes: [] }
    const settings = Object.assign({}, defaults, options)
    return factory(settings, done)
}

export default replaceNodeValues
