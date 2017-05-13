/* eslint-disable array-bracket-spacing, no-unused-expressions */

import 'babel-polyfill'
import chai from 'chai'
import {
    deepExtend,
    entries,
    randRange,
    isElement,
    isText,
    stringSplice,
    passThrough } from '../lib/utils'

chai.should()


describe('Utils', () => {
    describe('#deepExtend', () => {
        it('Combines two or more Objects', () => {
            const a = { a: 1, b: { c: 2, d: [ 3, 4, { e: 5 } ] } }
            const b = { a: 2, b: { d: [ 3, 4, { e: 6 } ], f: 7 } }
            const c = { g: 8 }
            const d = deepExtend(a, b, c)
            d.should.deep.equal({ a: 2, b: { c: 2, d: [ 3, 4, { e: 6 } ], f: 7 }, g: 8 })
        })
    })
    describe('#entries', () => {
        it('Creates an iterative instance from an Object', () => {
            const o = { a: 1, b: 2, c: 3 }
            let t = ''
            let n = 0
            for (const [k, v] of entries(o)) {
                t += k
                n += v
            }
            t.should.equal('abc')
            n.should.equal(6)
        })
    })
    describe('#randRange', () => {
        it('Generates a random number in between min and max', () => {
            randRange(0, 1).should.be.within(0, 1)
            randRange(2, 2).should.equal(2)
        })
    })
    describe('#isElement', () => {
        it('Tests in input is an array', () => {
            // TODO: test for browser
            isElement([]).should.be.true
            isElement('foo').should.be.false
            isElement().should.be.false
        })
    })
    describe('#isText', () => {
        it('Tests in input is a string', () => {
            // TODO: test for browser
            isText([]).should.be.false
            isText().should.be.false
            isText('foo').should.be.true
        })
    })
    describe('#stringSplice', () => {
        it('Splices a string', () =>
            stringSplice('foo bar baz', 'bat', 4, 7).should.equal('foo bat baz')
        )
    })
    describe('#passThrough', () => {
        it('Returns a single argument', () =>
            passThrough('foo').should.equal('foo')
        )
    })
})
