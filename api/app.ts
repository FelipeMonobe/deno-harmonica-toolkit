import { Application, oakCors, Snelm } from './deps.ts'
import router from './router.ts'

const app = new Application()
const snelmInstance = new Snelm('oak')
const originPattern = /^https:\/\/deno-harmonica-toolkit-app\.deno\.dev/

app.use(oakCors({ origin: originPattern, optionsSuccessStatus: 200 }))
app.use(async ({ response: res, request: req }, next) => {
  res = snelmInstance.snelm(req, res)
  await next()
})
app.use(async ({ request: req }, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} @ ${req.url}`)
  await next()
})
app.use(router.routes())
app.use(router.allowedMethods())

addEventListener('fetch', app.fetchEventHandler())