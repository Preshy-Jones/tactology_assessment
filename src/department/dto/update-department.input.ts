import { CreateDepartmentInput } from './create-department.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
