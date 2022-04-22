import { Router } from 'express'
import users from '@/core/controller/utilisateurs'
import templates from '@/core/controller/templates'
import roles from '@/core/controller/roles'

const api = Router()

api.use('/', users)

// POUR LES CHEMINS BASIQUE
api.use('/roles', roles)

// POUR LES CHEMINS LIÉES A UN UTILISATEUR
api.use('/:userId/templates', templates)

export default api
