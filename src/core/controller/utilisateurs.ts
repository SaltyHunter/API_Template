import { Router, Request, Response } from 'express'
import { error, success } from '@/core/utils/response'
import { BAD_REQUEST, OK, UNAUTHORIZED } from '@/core/constants/api'
import Utilisateur from '@/core/models/Utilisateur'
import bcrypt from 'bcryptjs'
import { sendSuppression } from '@/core/mail'
import { factory } from '@/core/utils/log'
import { getLogger } from 'log4js'
import { transform } from '@/core/utils/utils'

const file = transform(__filename)
const logger = getLogger(file)
const log = factory.getLogger(file)
const users = Router()

users.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  console.log(id)
  try {
    const user = await Utilisateur.findOne({ where: { id } })
    res.status(OK.code).json(success(user))
    logger.info("Consultation du profil utilisateur "+id)
    log.info("Consultation du profil utilisateur "+id)
  } catch (err) {
    res.status(BAD_REQUEST.code).json(error(BAD_REQUEST, err))
    logger.error(err)
    log.error(err)
  }

})

users.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const { username, password, passwordConfirmation, mail, prenom, nom } = req.body

    if (password !== passwordConfirmation) {
      throw new Error("Le mot de passe n'est pas le meme")
    }
    const pw = bcrypt.hashSync(password)
    
    await Utilisateur.update({ id: id }, { username: username, password: pw, mail: mail, nom: nom, prenom: prenom });

    const user = await Utilisateur.findOne({ where: { id: id } })

    res.status(OK.code).json(success(user))
    logger.info("Modification effectué pour l'utilisateur "+id)
    log.info("Modification effectué pour l'utilisateur "+id)

  } catch (err) {
    res.status(BAD_REQUEST.code).json(error(BAD_REQUEST, err))
    logger.error(err)
    log.error(err)

  }
})

users.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await Utilisateur.findOne({ where: { id } })
    const username = user?.username
    const mail = user?.mail
    if (username !== undefined && mail !== undefined) {
      await sendSuppression(mail, { username })
      await Utilisateur.delete({ id: id })
    }
    res.status(OK.code).json({ delete: 'OK' })
    logger.info("Suppression effectué pour l'utilisateur "+id)
    log.info("Suppression effectué pour l'utilisateur "+id)
  } catch (err) {
    res.status(BAD_REQUEST.code).json(error(BAD_REQUEST, err))
    logger.error(err)
    log.error(err)
  }
})
export default users
