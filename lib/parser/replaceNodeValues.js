import factory from './factory'
import { stringSplice } from '../utils'

function walker(_nodes, { transform, indices, boundary }) {
    const nodes = _nodes.map(_ => _.trim())

    let collectionIndex
    let currentNode
    let linePosition
    let wordStartIndex
    let wordEndIndex

    // each node has a corresponding entry in indices (even if it's an empty
    // array), so we iterate over indices and select using the current key
    //
    for (const collection of indices) {                 // => [[ 1 ]]
        collectionIndex = indices.indexOf(collection)
        currentNode = nodes[collectionIndex]

        for (const index of collection) {               // => [ 1 ]
            // since it's a boundary, we want to start capturing the word from
            // the next character in the string
            linePosition = index + 1
            wordStartIndex = linePosition

            let char
            let word = ''

            for (;;) {
                if (linePosition >= currentNode.length                                  // end of line
                    || typeof currentNode[linePosition] === 'undefined'                 // node does not exist
                    || (char = currentNode[linePosition].charAt(0)) === boundary) {     // reassigned char is word boundary
                    wordEndIndex = linePosition
                    break
                }

                word += char
                ++linePosition
            }

            // apply transform
            word = transform(word)

            // re-combine string and mutate node
            nodes[collectionIndex] = stringSplice(currentNode, word, wordStartIndex, wordEndIndex)
        }
    }
    return { indices, nodes }
}

function replaceNodeValues(options = {}, done) {
    const defaults = { walker, indices: [], nodes: [] }
    const settings = Object.assign({}, defaults, options)
    return factory(settings, done)
}

export default replaceNodeValues
