import { mapBoundaries, randBoundaries, replaceNodeValues } from './'

function replaceText(options, done) {
    // TODO: this entire fn (`replaceText`) should be called in a loop, or
    // `mapBoundaries` needs to be once per entry in nodes ([[ ]]) in one of
    // the fns below.
    //

    let err = null

    const { nodes } = options
    const indices = mapBoundaries({ nodes })[0].indices                     // gets indices of whitespace
    const rand = randBoundaries({ nodes: indices })                         // gets random indices from array above
    const settings = Object.assign({}, options, { nodes, indices: rand })   // merge object with original options
    const result = replaceNodeValues(settings)                              // apply transform to node

    return done && typeof done === 'function' ? done(err, result) : err || result
}
export default replaceText
