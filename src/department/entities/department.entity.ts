import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import { SubDepartment } from './sub-department.entity';

@ObjectType()
@Entity()
export class Department {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [SubDepartment], { nullable: true })
  @OneToMany(() => SubDepartment, (subDepartment) => subDepartment.department, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  subDepartments?: SubDepartment[];
}
