import { Bot } from 'grammy';
import { extract_entity_value, generate_keyboard, generate_response } from './helpers';

export const configureBotLogic = (bot: Bot) => {

  bot.command('start', (ctx) => {
    ctx.reply('Heya!😍 Welcome to WordMastersCheat bot.\n\nJust send me all allowed characters in a message and I\'ll send you back all possible words✅\nThen use inline buttons to configure max and min length of words⬆️⬇️\n\nCreated with love for you by Sasuke}{')
  })

  bot.on('message', async (ctx) => {
    let characters = ctx.message.text??''
    characters = characters.toLowerCase().trim()

    if (!characters || !characters.match(/^[a-z]+$/)) {
      ctx.reply('Please send only lowercase english characters (length should be between 4 and 7 characters)');
      return;
    }
  
    const filter = 'filter_all'

    const responseText = generate_response(characters, filter);

    await ctx.reply(responseText, {
      parse_mode: 'Markdown',
      reply_to_message_id: ctx.message.message_id,
      reply_markup: {
        inline_keyboard: generate_keyboard(characters).inline_keyboard
      }
    })
  })

  bot.on('callback_query:data', async (ctx) => {
    const data = ctx.callbackQuery.data.split(':')
    const filter = data[0] as any
    const characters = data[1]
   
    const responseText = generate_response(characters, filter)

    await ctx.editMessageText(responseText, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: generate_keyboard(characters, filter).inline_keyboard
      }
    })
    
    await ctx.answerCallbackQuery()
  })

  bot.on('inline_query', (ctx) => {
    const characters = (ctx.inlineQuery.query??'').toLowerCase();
    
    if (!characters || !characters.match(/[a-z]{4,7}/)) {
      ctx.answerInlineQuery([])
      return;
    }

    ctx.answerInlineQuery([
      {
        id: characters,
        type: 'article',
        title: 'Cheat It!',
        description: `Find all valid combinations of ${characters}`,
        reply_markup: {
          inline_keyboard: generate_keyboard(characters).inline_keyboard
        },
        input_message_content: {
          parse_mode: 'Markdown',
          message_text: generate_response(characters),
        }
      },
      {
        id: characters + '-wk',
        type: 'article',
        title: 'Cheat It Without Keyboard!',
        description: `Find all valid combinations of ${characters}`,
        input_message_content: {
          parse_mode: 'Markdown',
          message_text: generate_response(characters),
        }
      }
    ])
  })

  bot.catch(error => {
    console.log(['error', error.message])
  })
}