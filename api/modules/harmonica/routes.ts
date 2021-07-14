import { Router } from '../../deps.ts'
import * as handlers from './handlers.ts'

const router = new Router({ prefix: '/harmonica' })

router
  .post('/transpose', handlers.transpose)

export default router.routes()