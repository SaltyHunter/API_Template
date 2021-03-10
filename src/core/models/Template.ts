import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import User from './User'

@Entity()
export default class Template extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string

  @Column({ nullable: false })
  user_id!: string

  @Column({ nullable: false })
  name!: string

  @CreateDateColumn()
  createdAt!: string

  @ManyToOne(() => User, (user: User) => user.template, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User

  /**
   * Methods
   */
  public toJSON(): Template {
    const json: Template = Object.assign({}, this)

    delete json.user

    return json
  }
}
