import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    JoinColumn,
    OneToOne,
    InsertQueryBuilder,
    QueryBuilder,
  } from 'typeorm'
  import Utilisateur from './Utilisateur'
  
  @Entity()
  export default class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number
  
    @Column({ nullable: false })
    role!: string
  
    @CreateDateColumn()
    createdAt!: string
  
    @OneToOne(() => Utilisateur, (user: Utilisateur) => user.role)
    user!: Utilisateur    
    
    /**
     * Methods
     */
    public toJSON(): Role {
      const json: Role = Object.assign({}, this)
    
      return json
    }
  }
  