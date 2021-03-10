import { Router } from 'express'
import users from '@/core/controller/users'
import templates from '@/core/controller/templates'

const api = Router()

api.use('/users', users)
api.use('/users/:userId/template', templates)

export default api
