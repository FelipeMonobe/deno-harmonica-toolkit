import { Router } from './deps.ts'
import harmonicaRoutes from './modules/harmonica/routes.ts'

const router = new Router()

router.use(harmonicaRoutes)

export default router