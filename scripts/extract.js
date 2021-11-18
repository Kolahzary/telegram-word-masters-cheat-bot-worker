/*
 * Run this file in browser console of Telegram Web Z 
 * on a channel full of finished games
 * to extract all words
 */

// A regex to extract game words line from message
const pattern = new RegExp(/([a-zA-Z]+\([A-Z]\),? ?)+/g)
// Used set to remove duplicate words
let words = new Set()
let page = 0;

// Load new bunch of messages and extract them every 2 seconds
setInterval(function () {
	page = page + 1;
    // Scroll to Top in order to load another bunch of old messages
	document.querySelector('.MessageList').scrollTo(0,0);

    // Find all messages elements in the page
	document.querySelectorAll('.messages-container .text-content.with-meta').forEach((el) => {
        // Find all lines with game words
        const matches = [...el.innerText.matchAll(pattern)]
        if(!matches.length) return;

        // Each messages could contain multiple lines of words
        matches.forEach((match) => {
            const text = match[0].replace(' ', '')
            const bunch = text.split(',')
            // Each line contains multiple words
            bunch.forEach((word) => {
                // Add each word to our unique set
                words.add(word.trim())
            })
        })
	})

    // Write results in console after each iteration
    console.log(words)
    console.log(JSON.stringify([...words]))
}, 2000)
