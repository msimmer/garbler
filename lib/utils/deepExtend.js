import { entries } from './'
import { isPlainObject } from '../vendor/lodash.custom'

function deepExtend() {
    const args = Array.prototype.slice.call(arguments, 0)
    for (let i = 0; i < args.length; i++) {
        if (!isPlainObject(args[i])) {
            console.log(args[i])
            throw new Error(`[${typeof args[i]}] is not of type Object.`)
        }
    }
    const result = args[0]
    for (let i = 0; i < args.length; i++) {
        if (i === 0) { continue }
        for (const [k, v] of entries(args[i])) {
            if (isPlainObject(v) && {}.hasOwnProperty.call(result, k)) {
                deepExtend(result[k], v)
            } else {
                result[k] = v
            }
        }
    }
    return result
}

export default deepExtend
