import { Router, Request, Response } from 'express'
import auth from '@/core/controller/authenticate'
import secured from '@/routes/api/secured'
import passport from 'passport'

const api = Router()

api.get('/', (req: Request, res: Response) => {
  res.json({
    hello: "From Template's Api",
    meta: {
      status: 'running',
      version: '1.0.0',
    },
  })
})

api.use('/authenticate', auth)
api.use('/', passport.authenticate('jwt', { session: false }), secured)

export default api
