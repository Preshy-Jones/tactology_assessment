import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateSubDepartmentInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  id?: number;

  @Field()
  @IsString()
  @MinLength(2)
  name: string;
}
