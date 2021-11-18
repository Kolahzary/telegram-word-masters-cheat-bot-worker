import { Bot } from 'grammy';

export const configureBotLogic = (bot: Bot) => {

  bot.on('message', async (ctx) => {
    console.log(JSON.stringify(ctx))
    await ctx.reply('Heya!😍\nI\'m not ready yet 😢\nBut I promise I\'ll be your new shiny assistant as soon as I get ready 😜', {
      reply_to_message_id: ctx.message.message_id
    })
  })

}