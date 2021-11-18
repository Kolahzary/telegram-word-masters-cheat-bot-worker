import { handleHttpRequest } from './http-handler'

addEventListener('fetch', (event) => {
  event.respondWith(handleHttpRequest(event.request))
})
