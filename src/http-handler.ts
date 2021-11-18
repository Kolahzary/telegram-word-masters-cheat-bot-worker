import { Bot, webhookCallback } from 'grammy';
import { configureBotLogic } from './bot-handler';


const apiToken = (global as any).SECRET_BOT_API_TOKEN

const bot = new Bot(apiToken);

const receiveWebhook = webhookCallback(bot, 'callback')

configureBotLogic(bot)

export async function handleHttpRequest(request: Request): Promise<Response> {
  if (request.method === 'POST') {
    let response = 'OK'

    const update = request.json()

    await receiveWebhook(update, (res: string) => {
      response = res
    })

    return new Response(response)
  } else {
    const host = request.headers.get('host')
    await bot.api.setWebhook(`https://${host}`)
    return new Response(`Webhook (${host}) configured successfully`)
  }
}
