import 'babel-polyfill'
import chai from 'chai'
import util from 'util'
const should = chai.should()

import { mapBoundaries, randBoundaries, replaceNodeValues } from '../lib/parser'

describe('parser', () => {
    describe('#mapBoundaries', () => {
        it('Describes what it does', () => {
            console.log(`\
        [                       // container    (article)
            [                   // node element (paragraph)
                'a b c',        // node value   (text)
                'd e f',        // ...
                'g h i'
            ],
            [
                'j k l',
                'm n o'
            ]
        ]

        // => [ { indices: [ [ 1, 3 ], [ 1, 3 ], [ 1, 3 ] ], nodes: [ 'a b c', 'd e f', 'g h i' ] },
                { indices: [ [ 1, 3 ], [ 1, 3 ] ],           nodes: [ 'j k l', 'm n o' ] }]`)
        })
        it('Handles an asynchronous error', () => {
            const nodes = null
            mapBoundaries({ nodes }, (err) => {
                err.should.be.an.error
            })
        })
        it('Handles a synchronous error', () => {
            const nodes = null
            const a = mapBoundaries({ nodes })
            a.should.be.an.error
        })
        it('Accepts a callback parameter', () => {
            const nodes = [['foo', 'bar', 'baz']]
            mapBoundaries({ nodes }, (err) => {
                should.not.exist(err)
            })
        })
        it('Accepts an array of strings', () => {
            const nodes = [['foo', 'bar', 'baz']]
            const a = mapBoundaries({ nodes })[0].nodes
            a.should.be.an.array
            a.should.have.members(['foo', 'bar', 'baz'])
        })
        it('Normalizes the arguments\'s strings', () => {
            const nodes = [['   foo   ', '   bar   ']]
            const a = mapBoundaries({ nodes })[0].nodes
            a.should.be.an.array
            a[0].should.equal('foo')
            a[1].should.equal('bar')
        })
        it('Returns an array of indices', () => {
            const nodes = [['foo bar baz', 'q u x']]
            const a = mapBoundaries({ nodes })[0].indices
            a.should.be.an.array
            a[0].should.have.members([3, 7])
            a[1].should.have.members([1, 3])
        })
    })

    describe('#randBoundaries', () => {
        it('Creates a randomized matrix', () => {
            const opts = { minSample: .25, maxSample: .5, limit: 50 }
            const a = [ [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5, 6, 7, 8 ], [ 1, 2, 3 ], [] ]
            const b = randBoundaries(opts, a)

            b[0].length.should.be.within(1, 3)
            b[1].length.should.be.within(2, 4)
            b[2].length.should.be.within(1, 2)
            should.equal(b[3].length, 0)
        })
        it('Throws if a stack limit is reached', () => {
            const opts = { minSample: .25, maxSample: .5, limit: 1 }
            const a = [ [ 1, 2, 3, 4, 5 ] ]
            randBoundaries(opts, a).should.throw
        })
    })
})
