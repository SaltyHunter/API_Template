import { Router } from 'express'
import users from '@/core/controller/users'
import templates from '@/core/controller/templates'

const api = Router()

api.use('/', users)

// POUR LES CHEMINS BASIQUE
// api.use('/template', templates)

// POUR LES CHEMINS LIÉES A UN UTILISATEUR
api.use('/:userId/template', templates)

export default api
