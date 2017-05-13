import { randRange } from '../utils'

function addIndices(result, sampleSize, nodes, recursionLimit, _recursiveCalls) {
    // TODO: verify that this handles empty arrays, falsey values, etc.
    let recursiveCalls = _recursiveCalls || 0
    for (let i = 0; i < sampleSize; i++) {
        const randIndex = randRange(0, nodes.length - 1)
        if (result.indexOf(nodes[randIndex]) < 0) {
            recursiveCalls = 0
            result.push(nodes[randIndex])
        } else {
            // recurse to find unique index to add. pass `sampleSize` as 1 since it'll call itself
            recursiveCalls += 1
            if (recursiveCalls >= recursionLimit) {
                throw new Error('Exceeded stack limit')
            }
            addIndices(result, 1, nodes, recursionLimit, recursiveCalls)
        }
    }
    return result
}

// sample:
// [ [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5, 6, 7, 8 ], [ 1, 2, 3 ], [] ]

// get rand between
function getIndices(nodes, { minSample, maxSample, limit }) {
    // select between min-max% of the indices from nodes
    const pct = randRange(minSample * 100, maxSample * 100) / 100 // get multiplier
    const sampleSize = Math.ceil(nodes.length * pct) // get number of indices to add

    // create a new array of random indices
    // sample:
    // [ [ 5, 4, 3 ], [ 1, 4, 8, 2 ], [ 3 ], [] ]
    const result = []

    let err = null
    try {
        addIndices(result, sampleSize, nodes, limit)
    } catch (e) {
        err = e
    }

    return err || result
}

function randBoundaries(options = {}, done) {
    const defaults = {
        minSample: 0.25,     // % of indices to collect, default 25-50%
        maxSample: 0.5,
        limit: 10,          // number of recursive calls to run when looking for unique key
        nodes: [],          // TODO: required, should throw if not passed in
    }

    // // TODO: use callback with above two fns as walker
    // const settings = Object.assign({}, defaults, options)
    // return factory(settings, done)

    const settings = Object.assign({}, defaults, options)
    const { nodes } = settings

    const map = nodes.map(_ => getIndices(_, settings))
    let err = null
    if (done && typeof done === 'function') {
        return done(err, map)
    }
    return err || map
}

export default randBoundaries
