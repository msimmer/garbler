import 'babel-polyfill'
import chai from 'chai'
import Garbler from '../'
chai.should()

describe('Garbler', () => {
    it('Has prototypal properties', () =>
        Garbler.prototype.noop.should.be.defined
    )
    describe('#instance', () => {
        const garbler = new Garbler()
        it('Is an instance of Garbler', () =>
            garbler.should.be.an.instanceOf(Garbler)
        )
        it('Has class properties', () =>
            garbler.noop.should.be.defined
        )
    })

    describe('#replaceText', () => {
        it('Applies a callback to a random selection of text', () => {
            const transform = function transform(str) {
                return str.split('').reverse().join('')
            }
            const garbler = new Garbler()
            const nodes = [['one two three']]
            const result = garbler.replaceText({ nodes, transform })[0].nodes[0]
            result.should.match(/(?:^eno\s|\sowt\s|\seerht$)/)


            // const nodes = [['one two three four five six seven eight nine']]
            // const nodes = [['one two three', 'four five six', 'seven eight nine']]
                           // ['ten eleven twelve', 'thirteen fourteen fifteen', 'sixteen seventeen eighteen']]
        })

        it('Does not modify the text if no callback is supplied', () => {
            const garbler = new Garbler()
            const nodes = [['one two three']]
            const result = garbler.replaceText({ nodes })[0].nodes
            result.should.include.members(['one two three'])
        })

        it('Can be called synchronously', () =>
            new Garbler().replaceText({ nodes: [[]] }).should.be.an.array
        )

        it('Can be called asynchronously', () =>
            new Garbler().replaceText({ nodes: [[]] }, (err, result) => result.should.be.an.array)
        )
    })
})
