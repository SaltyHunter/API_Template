import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm'
import bcrypt from 'bcryptjs'
import Template from './Template'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ nullable: false, unique: true })
  username!: string

  @Column({ nullable: false, unique: true })
  mail!: string

  @Column({ nullable: false })
  nom!: string

  @Column({ nullable: false })
  prenom!: string

  @Column({ nullable: false })
  password!: string

  @CreateDateColumn()
  createdAt!: string

  @OneToMany(() => Template, (template: Template) => template.user)
  template!: Template[]
  
  /**
   * Hooks
   */
  @BeforeInsert()
  @BeforeUpdate()
  public hashPassword(): void | never {
    if (!this.password) {
      throw new Error('Mot de passe non défini')
    }

    this.password = bcrypt.hashSync(this.password)
  }

  /**
   * Methods
   */
  public checkPassword(uncryptedPassword: string): boolean {
    return bcrypt.compareSync(uncryptedPassword, this.password)
  }

  public toJSON(): User {
    const json: User = Object.assign({}, this)

    delete json.password

    return json
  }
}
