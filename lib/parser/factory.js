import { passThrough } from '../utils'

function factory(options, done) {
    const defaults = { transform: passThrough, boundary: ' ' }
    const settings = Object.assign({}, defaults, options)

    const { nodes, walker } = settings

    let result = []
    let err = null
    try {
        const _nodes = Array.from(nodes)
        result = _nodes.map(_ => walker(_, settings))
    } catch (e) {
        err = e
    }

    if (done && typeof done === 'function') {
        return done(err, result)
    }
    return err || result
}

export default factory
