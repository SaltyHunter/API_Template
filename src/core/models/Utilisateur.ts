import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm'
import bcrypt from 'bcryptjs'
import Template from './Template'
import Role from './Role'

@Entity()
export default class Utilisateur extends BaseEntity {
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

  @Column({ nullable: false })
  role_id!: number

  @CreateDateColumn()
  createdAt!: string

  @OneToMany(() => Template, (template: Template) => template.user)
  template!: Template[]
  
  @OneToOne(() => Role, (role: Role) => role.user )
  @JoinColumn({ name: 'role_id' })
  role!: Role

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

  public toJSON(): Utilisateur {
    const json: Utilisateur = Object.assign({}, this)

    delete json.password

    return json
  }
}
