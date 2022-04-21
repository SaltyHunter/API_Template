import { Router, Request, Response } from 'express'
import { error, success } from '@/core/utils/response'
import { BAD_REQUEST, CREATED, OK } from '@/core/constants/api'
import User from '@/core/models/User'
import Template from '@/core/models/Template'
import { factory } from '@/core/utils/log'
import { getLogger } from 'log4js'
import { transform } from '@/core/utils/utils'

const file = transform(__filename)
const logger = getLogger(file)
const log = factory.getLogger(file)
const templates = Router({ mergeParams: true })

templates.get('/', async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const template = await Template.find({ where: { user_id : userId } })
    res.status(OK.status).json(template)
    logger.info("Consultation des templates de l'utilisateur "+userId)
    log.info("Consultation des templates de l'utilisateur "+userId)
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    logger.error("Erreur de consultation pour les templates de l'utilisateur "+userId)
    log.error("Erreur de consultation pour les templates de l'utilisateur "+userId)
  }
})

templates.post('/', async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const user = await User.findOne({ where: { id: userId } })

    if (!user) {
      throw new Error(`L'utilisateur ${userId } n'existe pas`)
    }
    const { name } = req.body
    const template = new Template()
    template.user = user
    template.name = name
    await template.save()
    res.status(CREATED.status).json(success(template))
    logger.info("Template "+template.id+" créé pour l'utilisateur "+userId)
    log.info("Template "+template.id+" créé pour l'utilisateur "+userId)
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    logger.error("Erreur de création de template pour l'utilisateur"+userId)
    log.error("Erreur de création de template pour l'utilisateur"+userId)
  }
})

templates.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const { name } = req.body
    await Template.update({ id: id }, { name: name })
    const template = await Template.findOne({ where: { id: id } })
    res.status(OK.status).json(success(template))
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    logger.error("Erreur de modification pour le template "+id)
    log.error("Erreur de modification pour le template "+id)
  }
})

templates.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await Template.delete({ id: id })
    res.status(OK.status).json({ delete: 'OK' })
    logger.info("Suppression effectué pour le template "+id)
    log.info("Suppression effectué pour le template "+id)
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    logger.error("Erreur lors de la suppresstion du template "+id)
    log.error("Erreur lors de la suppresstion du template template "+id)
    }
})

export default templates
