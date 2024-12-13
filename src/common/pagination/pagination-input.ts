// pagination.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @IsNumber()
  page?: number = 1;

  @IsNumber()
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit?: number = 10;
}
