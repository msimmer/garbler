/* eslint-disable array-bracket-spacing, no-unused-expressions */

import 'babel-polyfill'
import chai from 'chai'
import { mapBoundaries, randBoundaries, replaceNodeValues } from '../lib/parser'

const should = chai.should()


describe('parser', () => {
    describe('#mapBoundaries', () => {
        it('Describes what it does', (done) => {
            done()
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
            mapBoundaries({ nodes }, err =>
                err.should.be.an.error
            )
        })
        it('Handles a synchronous error', () =>
            mapBoundaries({ nodes: null }).should.be.an.error
        )
        it('Accepts a callback parameter', () => {
            const nodes = [['foo', 'bar', 'baz']]
            mapBoundaries({ nodes }, err =>
                should.not.exist(err)
            )
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
            const opts = { minSample: 0.25, maxSample: 0.5, limit: 50 }
            const nodes = [ [ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 4, 5, 6, 7, 8 ], [ 1, 2, 3 ], [] ]
            const settings = Object.assign({}, opts, { nodes })
            const a = randBoundaries(settings)

            a[0].length.should.be.within(1, 3)
            a[1].length.should.be.within(2, 4)
            a[2].length.should.be.within(1, 2)
            should.equal(a[3].length, 0)
        })
        it('Throws if a stack limit is reached', () => {
            const opts = { minSample: 0.25, maxSample: 0.5, limit: 1 }
            const a = [ [ 1, 2, 3, 4, 5 ] ]
            randBoundaries(opts, a).should.throw
        })
    })

    describe('#replaceNodeValues', () => {
        it('Returns transformed strings', () => {
            const nodes = [[
                'This is the first node',
                'This is the second node',
            ]]
            const indices = [ [ 7 ], [ 11 ] ]
            const transform = function transform(str) {
                return str.split('').reverse().join('')
            }
            const result = replaceNodeValues({ nodes, indices, transform })[0].nodes
            result[0].split(' ')[2].should.equal('eht')
            result[1].split(' ')[3].should.equal('dnoces')
        })
    })
})
