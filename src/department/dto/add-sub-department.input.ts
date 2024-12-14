import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsString, MinLength } from 'class-validator';

@InputType()
export class AddSubDepartmentInput {
  @Field()
  @IsString()
  @MinLength(2)
  name: string;

  //department Id
  @Field()
  @IsNumber()
  departmentId: string;
}
