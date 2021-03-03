import { Router, Request, Response } from 'express'
import { error, success } from '../../core/helpers/response'
import { BAD_REQUEST, CREATED, OK } from '../../core/constants/api'
import jwt from 'jsonwebtoken'
import User from '@/core/models/User'
import passport from 'passport'
import { sendConfirmation } from '@/core/mail'
import { factory } from '@/core/libs/log'
import { getLogger } from 'log4js'
import { transform } from '@/core/libs/utils'

const file = transform(__filename)
const logger = getLogger(file)
const log = factory.getLogger(file)

const api = Router()
api.post('/signup', async (req: Request, res: Response) => {
  try {
    const { username, mail, n_tel, prenom, nom, password, passwordConfirmation } = req.body
    if (password !== passwordConfirmation) {
      throw new Error("Le mot de passe n'est pas le meme")
    }
    const user = new User()

    user.username = username
    user.mail = mail
    user.n_tel = n_tel
    user.prenom = prenom
    user.nom = nom
    user.password = password

    await user.save()
    const payload = { id: user.id, username }
    const token = jwt.sign(payload, process.env.JWT_ENCRYPTION as string)
    res.status(CREATED.status).json(success(user, { token }))
    await sendConfirmation(mail, { username })
    logger.info("Création de l'utilisateur " + user.id)
    log.info("Création de l'utilisateur " + user.id)
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    logger.error("impposible de créer l'utilisateur car "+err.message)
    log.error("impposible de créer l'utilisateur car "+err.message)
  }
})

api.post('/signin', async (req: Request, res: Response) => {
  const authenticate = passport.authenticate('local', { session: false }, (errorMessage, user) => {
    try {
      if (errorMessage) {
        res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, new Error(errorMessage)))
        logger.error("Connexion impossible car "+errorMessage)
        log.error("Connexion impossible car "+errorMessage)
        return
      }
      const payload = { id: user.id, username: user.username }
      const token = jwt.sign(payload, process.env.JWT_ENCRYPTION as string)
      res.status(OK.status).json(success(user, { token }))
      logger.info("Connexion de l'utilisateur " + user.id)
      log.info("Connexion de l'utilisateur " + user.id)
    } catch (err) {
      res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    }
  })
  authenticate(req, res)
})

/*api.post('/resetpw', async (req: Request, res: Response) => {
  //todo
})

api.post('/resetpw', async (req: Request, res: Response) => {
  //todo
})
*/
export default api
