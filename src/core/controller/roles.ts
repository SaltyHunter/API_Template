import { Router, Request, Response } from 'express'
import { error, success } from '@/core/utils/response'
import { BAD_REQUEST, CREATED, OK, UNAUTHORIZED } from '@/core/constants/api'
import Role from '@/core/models/Role'
import Utilisateur from '@/core/models/Utilisateur'
import { factory } from '@/core/utils/log'
import { getLogger } from 'log4js'
import { transform } from '@/core/utils/utils'

const file = transform(__filename)
const logger = getLogger(file)
const log = factory.getLogger(file)
const roles = Router({ mergeParams: true })

roles.get('/all', async (req: Request, res: Response) => {
  try {
    const role = await Role.find()
    res.status(OK.code).json(role)
    logger.info("Consultation des roles ")
    log.info("Consultation des roles ")
  } catch (err) {
    res.status(BAD_REQUEST.code).json(error(BAD_REQUEST, err))
    logger.error(err)
    log.error(err)
  }
})

roles.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
    try {
      const role = await Role.find({ where : { id : +id}})
      res.status(OK.code).json(role)
      logger.info("Consultation d'un role ")
      log.info("Consultation d'un role ")
    } catch (err) {
      res.status(BAD_REQUEST.code).json(error(BAD_REQUEST, err))
      logger.error(err)
      log.error(err)
    }
  })

roles.post('/', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const user = await Utilisateur.findOne({ where: { id: userId } })
    if (user?.role_id !== 1){
      let message = `L'utilisateur ${user?.prenom} ${user?.prenom} ne possède pas les droits nécessaire`
      res.status(UNAUTHORIZED.code).json(error(UNAUTHORIZED,message))
    }else {
      const { role } = req.body
      const roles = new Role()
      roles.role = role
      console.log(roles.role)
      await roles.save()
      res.status(CREATED.code).json(success(roles))
      logger.info("Role "+roles.role+" créé")
      log.info("Role "+roles.role+" créé")
    }
  } catch (err) {
    res.status(BAD_REQUEST.code).json(error(BAD_REQUEST, err))
    logger.error(err)
    log.error(err)
  }
})

roles.put('/:id', async (req: Request, res: Response) => {
  const { id, userId } = req.params
  try {
    const user = await Utilisateur.findOne({ where: { id: userId } })
    if (user?.role_id !== 1){
      let message = `L'utilisateur ${user?.prenom} ${user?.prenom} ne possède pas les droits nécessaire`
      res.status(UNAUTHORIZED.code).json(error(UNAUTHORIZED,message))
    }else {
      const { role } = req.body
      await Role.update({ id: +id }, { role: role });
      const roles = await Role.findOne({ where: { id: +id } })
      res.status(OK.code).json(success(roles))
    }
  } catch (err) {
    res.status(BAD_REQUEST.code).json(error(BAD_REQUEST, err))
    logger.error("Erreur de modification pour le role "+err)
    log.error("Erreur de modification pour le role "+err)
  }
})

roles.delete('/:id', async (req: Request, res: Response) => {
  const { id, userId } = req.params
  try {
    const user = await Utilisateur.findOne({ where: { id: userId } })
    if (user?.role_id !== 1){
      let message = `L'utilisateur ${user?.prenom} ${user?.prenom} ne possède pas les droits nécessaire`
      res.status(UNAUTHORIZED.code).json(error(UNAUTHORIZED,message))
    }else {
      await Role.delete({ id: +id })
      res.status(OK.code).json({ delete: 'OK' })
      logger.info("Suppression effectué pour le role "+id)
      log.info("Suppression effectué pour le role "+id)
    }
  } catch (err) {
    res.status(BAD_REQUEST.code).json(error(BAD_REQUEST, err))
    logger.error("Erreur lors de la suppresstion du role "+id)
    log.error("Erreur lors de la suppresstion du role role "+id)
    }
})

export default roles
