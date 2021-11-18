import { readFileSync } from 'fs';

// Config
const allowed = 'rsnuiemg';
const minLength = 5;
const maxLength = 20;

// Read dictionary file
let rawInput = readFileSync('dictionary.json');
let words = JSON.parse(rawInput);

let output = words
    // only allowed length
    .filter(wordObject => minLength <= wordObject.word.length && wordObject.word.length <= maxLength)
    // only allowed chars
    .filter(wordObject => ![...wordObject.word].some(char => !allowed.includes(char)))

const scorePerCharacter = {
    'a': 5,
    'i': 3,
    'm': 3,
    'b': 2
}

// calculate score
output = output.map(x => ({
    ...x,
    score: scorePerCharacter[x.level] * x.word.length
}))

// sort by score
output.sort((a,b) => b.score - a.score )

console.log(output);
