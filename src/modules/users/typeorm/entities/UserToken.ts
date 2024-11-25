import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('user_tokens')
  class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    @Generated('uuid')
    token: string;
  
    @Column()
    user_id: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @Column({ nullable: true }) // (soft delete)
    deleted_at: Date;
  }
  
  export default UserToken;