import dotenv from 'dotenv'
import { createConnection, Connection, createQueryBuilder } from 'typeorm'
import Utilisateur from '@/core/models/Utilisateur'
import Template from '@/core/models/Template'
import Role from '../models/Role'

export default class Database {
  private static _instance: Database | null = null
  private _connection: Connection | null = null

  // private constructor() {}

  public static getInstance(): Database {
    if (!Database._instance) {
      Database._instance = new Database()
    }

    return Database._instance
  }

  public async authenticate(): Promise<Connection | never> {
    dotenv.config()

    const founded = (process.env.DATABASE_URL as string).match(/^(postgres):\/\/(.*):(.*)@(.*):(\d+)\/(.*)$/)
    if (!founded) {
      throw new Error('Verifier la valeur de la DATABASE_URL')
    }

    const [, , username, password, host, port, database] = founded

    this._connection = await createConnection({
      type: 'postgres',
      host,
      port: parseInt(port),
      username,
      password,
      database,
      entities: [Utilisateur, Template, Role],
      dropSchema: false,
      synchronize: true,
      logging: false,
    })

    // 'insert into role(id, role) values(1, Administrateur),(2, Utilisateur')'
    await createQueryBuilder().insert().into(Role).values([
      { id: 1, role: 'Administrateur' },
      { id: 2, role: 'Utilisateur' }
    ])

    return this._connection
  }
}
