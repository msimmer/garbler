import factory from './factory'
import { isElement, isText } from '../utils'

//
// TODO: extend options
//
// options:
//      deep (bool)
//      nodes (array)
//      boundaries (array<str>|array<re>)
//          default whitespace
//

function walker(_nodes) {
    const whitespace = ' '
    const indices = []
    const nodes = _nodes.map(_ => _.trim()) // text, see also `normalize`: https://developer.mozilla.org/en-US/docs/Web/API/Node/normalize

    let pos
    let nodeIndex
    // TODO: support for browser: node API
    for (const node of nodes) { // node: array of strings
        if (!isText(node)) { continue }
        pos = 0
        nodeIndex = nodes.indexOf(node)
        while (pos < node.length) { // should recurse if `settings.deep`
            pos++
            if (node.charAt(pos) === whitespace) { // should check against `settings.boundaries`
                if (!indices[nodeIndex] || indices[nodeIndex].constructor !== Array) {
                    indices[nodeIndex] = []
                }
                indices[nodeIndex].push(pos)
            }
        }
    }
    return { indices, nodes }
}

function mapBoundaries(options = {}, done) {
    const defaults = { walker, deep: false, nodes: [] }
    const settings = Object.assign({}, defaults, options)
    return factory(settings, done)
}

export default mapBoundaries
