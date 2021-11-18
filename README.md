# ʕ •́؈•̀) `telegram-word-masters-cheat-bot-worker`

A Telegram bot hosted on Cloudflare workers, which helps you find all answers to WordMasters game.

- Game Bot: [@WordMastersBot](https://t.me/WordMastersBot)
- Cheating Bot (This repo): [@WordMastersCheatBot](https://t.me/WordMastersCheatBot)

Source code is clear enough to be used as a base project for other bots,

All your warm commits on this project are welcome!

## About WordMasterBot

A Telegram bot which allows you to play words game with your friends or in Telegram groups.

It gives you a list of allowed characters and you should find all valid combinations with those characters.

## How to deploy it as new Telegram Bot

- Setup latest version of cloudflare `yarn add wrangler --global`
- Login your cloudflare account `wrangler login`
- Create a new bot and API key using [@BotFather](https://t.me/BotFather)
- Set your bot's api key using: `wrangler secret put SECRET_BOT_API_TOKEN`
- To run on your own machine: `wrangler dev`
- To publish the project to cloud: `wrangler publish`

### CLI Script Usage (scripts folder)
- Create dictionary file (you can skip this if you're gonna use dictionary.json from this repository)
- Set allowed chars and length limits in find.js
- run `node find.js`, it will print all possible words in terminal

### How to create dictionary.json file
- Open a browser (I've tested it on Google Chrome)
- Open [Telegram Web Z](https://web.telegram.org/z/)
- Open [English Games Telegram Channel](https://t.me/EnglishChallengers) or another channelng with lots of finished games
- Press F11 to open Developer Tools
- Open Console Tab
- Copy and paste contents of `extract.js` file into console and press enter to run it
- Wait until it extracts all words from the channel
- Copy last json content from browser console to a file named `extracted.json` in the same directory as `prepare.js` file
- Run `node prepare.js`, it will generate our dictionary file

