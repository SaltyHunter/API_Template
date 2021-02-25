import { Router } from 'express'
import users from '@/core/controller/user'
import templates from '@/core/controller/template'

const api = Router()

api.use('/users', users)
api.use('/users/:userId/template', templates)

export default api
