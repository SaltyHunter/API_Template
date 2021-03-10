import path from 'path'
import dotenv from 'dotenv'
import { isEmpty } from 'lodash'
import { existsSync } from 'fs'

const regex =  /[\\]|[\/]/gmi;

export const argv: string[] = process.argv.slice(2)

export function prelude(): void | never {
  const envPathName = path.join(process.cwd(), '.env')
  const appConfig = require(path.join(process.cwd(), 'app.config.json'))

  if (process.env.NODE_ENV === 'production' || existsSync(envPathName)) {
    dotenv.config()

    const missingValues = appConfig.env.filter((key: string) => process.env[key] === undefined)
    if (!isEmpty(missingValues)) {
      throw new Error(`Les [ ${missingValues.join(', ')}] valeurs ne sont pas présent dans le fichier .env`)
    }
  } else {
    throw new Error("Aucun fichier .env n'a été trouvé")
  }
}

export function transform(string:string){
  const file = string.split(regex);
  let filename = file.pop();
  if (filename !== undefined) {
    return filename
  } 
  else {
    return 'default'
  }
}

export function email(mail:string | undefined) {
  if (mail !== undefined) {
    return mail
  }
  else {
    return 'patchakwak@template.api'
  }
}