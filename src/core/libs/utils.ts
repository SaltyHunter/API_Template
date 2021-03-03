import path from 'path'
import dotenv from 'dotenv'
import { isEmpty } from 'lodash'
import { existsSync } from 'fs'
import { factory } from '@/core/libs/log'
import { getLogger } from 'log4js'

const file = transform(__filename)
const logger = getLogger(file)
const log = factory.getLogger(file)

export const argv: string[] = process.argv.slice(2)

export function prelude(): void | never {
  const envPathName = path.join(process.cwd(), '.env')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const appConfig = require(path.join(process.cwd(), 'app.config.json'))

  if (process.env.NODE_ENV === 'production' || existsSync(envPathName)) {
    dotenv.config()

    const missingValues = appConfig.env.filter((key: string) => process.env[key] === undefined)
    if (!isEmpty(missingValues)) {
      //throw new Error(`Sorry [ ${missingValues.join(', ')}] value(s) are missings on your .env file`)
      logger.error(`Les [ ${missingValues.join(', ')}] valeurs ne sont pas présent dans le fichier .env`)
      log.error(`Les [ ${missingValues.join(', ')}] valeurs ne sont pas présent dans le fichier .env`)
    }
  } else {
    //throw new Error('Sorry your .env file is missing')
    logger.error("Aucun fichier .env n'a été trouvé")
    log.error("Aucun fichier .env n'a été trouvé")
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function transform(string:string){
  const file = string.split("/");
  let filename = file.pop();
  if (filename !== undefined) {
    return filename
  } 
  else {
    return filename = 'default'
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function mail(mail:string | undefined) {
  if (mail !== undefined) {
    return mail
  }
  else {
    return mail = 'patchakwak@template.api'
  }
}