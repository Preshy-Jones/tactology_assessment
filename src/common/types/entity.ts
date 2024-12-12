import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class EntityContainer {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  createddate: Date;

  @UpdateDateColumn()
  updateddate: Date;
}
