import { Router, Request, Response } from 'express'
import auth from '@/core/controller/authenticate'
import secured from '@/routes/api/secured'
import passport from 'passport'

const api = Router()

api.get('/', (req: Request, res: Response) => {
  res.json({
    hello: "L'API Template est en actuellement lancée",
    meta: {
      status: 'running',
      version: '1.1.1',
    },
  })
})

api.use('/authenticate', auth)
api.use('/', passport.authenticate('jwt', { session: false }), secured)

export default api
