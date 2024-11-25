import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('users') 
  class User {
    @PrimaryGeneratedColumn('uuid') 
    id: string;
  
    @Column() 
    name: string;
  
    @Column() 
    email: string;
  
    @Column() 
    password: string;
  
    @CreateDateColumn() 
    created_at: Date;
  
    @Column({ nullable: true }) //soft delete
    deleted_at: Date;
  }
  
  export default User;