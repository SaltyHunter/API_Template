import { Router, Request, Response } from 'express'
import { error, success } from '@/core/utils/response'
import { BAD_REQUEST, CREATED, OK } from '../constants/api'
import jwt from 'jsonwebtoken'
import Utilisateur from '@/core/models/Utilisateur'
import passport from 'passport'
import { sendConfirmation } from '@/core/mail'
import { factory } from '@/core/utils/log'
import { getLogger } from 'log4js'
import { transform } from '@/core/utils/utils'

const file = transform(__filename)
const logger = getLogger(file)
const log = factory.getLogger(file)
const authenticate = Router()
const defaut = 3;

authenticate.post('/signup', async (req: Request, res: Response) => {
  try {
    const { username, mail, prenom, nom, password, passwordConfirmation } = req.body
    if (password !== passwordConfirmation) {
      throw new Error("Le mot de passe n'est pas le meme")
    }
    const user = new Utilisateur()

    user.username = username
    user.mail = mail
    user.prenom = prenom
    user.nom = nom
    user.password = password
    user.role_id = defaut

    await user.save()
    const payload = { id: user.id, username }
    const token = jwt.sign(payload, process.env.JWT_ENCRYPTION as string)
    res.status(CREATED.code).json(success(user, { token }))
    await sendConfirmation(mail, { username })
    logger.info("Création de l'utilisateur " + user.id)
    log.info("Création de l'utilisateur " + user.id)
  } catch (err) {
    res.status(BAD_REQUEST.code).json(error(BAD_REQUEST, err))
    logger.error("impposible de créer l'utilisateur"+err)
    log.error("impposible de créer l'utilisateur"+err)
  }
})

authenticate.post('/signin', async (req: Request, res: Response) => {
  const auth = passport.authenticate('local', { session: false }, (errorMessage, user) => {
    try {
      if (errorMessage) {
        res.status(BAD_REQUEST.code).json(error(BAD_REQUEST, new Error(errorMessage)))
        logger.error("Connexion impossible car "+errorMessage)
        log.error("Connexion impossible car "+errorMessage)
        return
      }
      const payload = { id: user.id, username: user.username }
      const token = jwt.sign(payload, process.env.JWT_ENCRYPTION as string)
      res.status(OK.code).json(success(user, { token }))
      logger.info("Connexion de l'utilisateur " + user.id)
      log.info("Connexion de l'utilisateur " + user.id)
    } catch (err) {
      res.status(BAD_REQUEST.code).json(error(BAD_REQUEST, err))
    }
  })
  auth(req, res)
})

export default authenticate
