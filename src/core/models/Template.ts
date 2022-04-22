import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import Utilisateur from './Utilisateur'

@Entity()
export default class Template extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false })
  user_id!: string

  @Column({ nullable: false })
  name!: string

  @CreateDateColumn()
  createdAt!: string

  @ManyToOne(() => Utilisateur, (user: Utilisateur) => user.template, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: Utilisateur

  /**
   * Methods
   */
  public toJSON(): Template {
    const json: Template = Object.assign({}, this)

    delete json.user

    return json
  }
}
