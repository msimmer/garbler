import languages from 'hyphenation.en-us'
import Hypher from '../lib/vendor/hypher'

const hyphenator = Object.assign({}, languages, {
    leftmin: 2,
    rightmin: 3,
    specialChars: '',
})

const hypher = new Hypher(hyphenator)

for (let i = 0; i < languages.id.length; i += 1) {
    if (!{}.hasOwnProperty.call(hypher, 'languages')) { hypher.languages = {} }
    hypher.languages[languages.id[i]] = hypher
}

export default hypher
