import { Message } from '@grammyjs/types';
import { InlineKeyboard } from 'grammy';
import { words } from './words';

const filters = {
    filter_all: {
        title: 'Show all words',
        min: 3,
        max: 14,
    },
    filter_bronze: {
        title: 'Bronze (3-4)',
        min: 3,
        max: 4,
    },
    filter_silver: {
        title: 'Silver (3-5)',
        min: 3,
        max: 5,
    },
    filter_gold: {
        title: 'Gold (4-6)',
        min: 4,
        max: 6,
    },
    filter_platinum: {
        title: 'Platinum (5-13)',
        min: 5,
        max: 13,
    }
}

export function find_words(characters: string, minLength: number, maxLength: number) {
    const filtered = words
        // only allowed length
        .filter(wordObject => minLength <= wordObject.word.length && wordObject.word.length <= maxLength)
        // only allowed chars
        .filter(wordObject => ![...wordObject.word].some(char => !characters.includes(char)))

    const scorePerCharacter = {
        'a': 5,
        'i': 3,
        'b': 2
    }
    
    // calculate score
    const output = filtered.map(x => ({
        ...x,
        score: scorePerCharacter[x.level] * x.word.length
    }))
    
    // sort by score
    output.sort((a,b) => b.score - a.score )

    return output
}

export function generate_response(characters: string, filter: keyof typeof filters = 'filter_all') {
    const matchedWords = find_words(characters, filters[filter].min, filters[filter].max)

    let result = ''
    matchedWords.forEach(x => {
        result += `\n${x.word}(${x.level})(${x.score})`
    })

    const sum = matchedWords.reduce((sum, current) => {
        sum[current.level]+=1;
        return sum
    },{
        a: 0,
        i: 0,
        b: 0
    })

    const response = `Given characters: \`${characters}\`\nFilter: ${filters[filter].title}\nResult: \`\`\`${result}\`\`\`\nTotal: ${matchedWords.length} (${sum.a}a, ${sum.i}i, ${sum.b}b)`
    if (response.length < 4000) {
        return response
    } else {
        return 'Response is too large, try less characters or apply some filters'
    }
}

export function generate_keyboard(characters: string, currentFilter: keyof typeof filters = 'filter_all') {
    let keyboard = new InlineKeyboard();

    const addInlineKey = (filter: keyof typeof filters) => {
        const check = filter === currentFilter ? '✅' : '☑️';
        return keyboard = keyboard.text(`${check} ${filters[filter].title}`, `${filter}:${characters}`)
    }

    addInlineKey('filter_all')
    keyboard = keyboard.row()
    addInlineKey('filter_bronze')
    addInlineKey('filter_silver')
    keyboard = keyboard.row()
    addInlineKey('filter_gold')
    addInlineKey('filter_platinum')

    return keyboard
}

export function extract_entity_value(message: Message, entityId: number) {
    const entity = (message.entities??[])[entityId];
    if (entity) {
        if (message.text) {
            return message.text.slice(entity.offset, entity.offset + entity.length)
        }
    }
    return ''
}
