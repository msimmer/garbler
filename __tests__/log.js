
import util from 'util'
export default function log(...args) {
    return console.log(util.inspect(args, false, null))
}
