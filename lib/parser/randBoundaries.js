import { randRange } from '../utils'

function addIndices(result, sampleSize, arr, recursionLimit, _recursiveCalls) {
    // TODO: verify that this handles empty arrays, falsey values, etc.
    let recursiveCalls = _recursiveCalls == null ? 0 : _recursiveCalls
    for (let i = 0; i < sampleSize; i++) {
        const randIndex = randRange(0, arr.length - 1)
        if (result.indexOf(arr[randIndex]) < 0) {
            recursiveCalls = 0
            result.push(arr[randIndex])
        } else {
            // recurse to find unique index to add. pass `sampleSize` as 1 since it'll call itself
            recursiveCalls += 1
            if (recursiveCalls >= recursionLimit) {
                throw new Error('Exceeded stack limit')
            }
            addIndices(result, 1, arr, recursionLimit, recursiveCalls)
        }
    }

    return result
}

// sample:
// [ [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5, 6, 7, 8 ], [ 1, 2, 3 ], [] ]

// get rand between
function getIndices(arr, { minSample, maxSample, limit }) {
    // select between min-max% of the indices from arr
    const pct = randRange(minSample * 100, maxSample * 100) / 100 // get multiplier
    const sampleSize = Math.ceil(arr.length * pct) // get number of indices to add

    // create a new array of random indices
    // sample:
    // [ [ 5, 4, 3 ], [ 1, 4, 8, 2 ], [ 3 ], [] ]
    const result = []

    let err = null
    try {
        addIndices(result, sampleSize, arr, limit)
    } catch (e) {
        err = e
    }

    return err || result
}

function randBoundaries(options = {}, arr, done) {
    const defaults = { minSample: .25, maxSample: .5 } // % of indices to collect, default 25-50%
    defaults.limit = 10 // number of recursive calls to run when looking for unique key

    const settings = Object.assign({}, defaults, options)
    const map = arr.map(_ => getIndices(_, settings))
    let err = null
    if (done && typeof done === 'function') {
        return done(err, map)
    }
    return err || map
}

export default randBoundaries
