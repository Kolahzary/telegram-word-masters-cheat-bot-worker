'use strict';

import { readFileSync, writeFileSync } from 'fs';

// Read Raw File
let rawInput = readFileSync('extracted.json');

// Convert to standard dictionary word objects
let input = JSON.parse(rawInput);
let output = []
input.forEach(item => {
    item = item.replace(')', '').split('(')
    if (item.length == 2) {
        output.push({
            word: item[0].toLowerCase(),
            level: item[1].toLowerCase()
        })
    }
});

// Write output
const rawOutput = JSON.stringify(output)
writeFileSync('dictionary.json', rawOutput);
