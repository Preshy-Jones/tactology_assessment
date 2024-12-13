import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import * as bcrypt from 'bcryptjs';

@Entity()
@ObjectType()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column()
  password: string;

  @Column({ default: new Date() })
  @Field()
  createdAt: Date;

  // Method to hash password before saving
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
