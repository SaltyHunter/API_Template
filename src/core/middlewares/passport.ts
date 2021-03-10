import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import dotenv from 'dotenv'
import User from '@/core/models/User'

dotenv.config()

/**
 * Local strategy
 */

passport.use(
  new LocalStrategy(
    {
    },
    async (username, password, next) => {
      try {
        const user = await User.findOne({ username })

        if (!user) {
          next(`l'utilisateur ${username} n'existe pas`, null)
          return
        }

        if (!user.checkPassword(password)) {
          next(`le mot de passe est incorrecte`, null)
          return
        }

        next(null, user)
      } catch (err) {
        next(err.message)
      }
    }
  )
)

/**
 * JSON Web Token strategy
 */

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ENCRYPTION as string,
    },
    async (jwtPayload: { id: string }, next: (arg0: string | null, arg1: User | undefined) => void) => {
      try {
        const { id } = jwtPayload

        const user = await User.findOne({ where: { id } })

        if (!user) {
          next(`l'utilisateur ${id} n'existe pas`, undefined)
          return
        }

        next(null, user)
      } catch (err) {
        next(err.message, undefined)
      }
    }
  )
)
