import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Department } from '../entities/department.entity';

@ObjectType()
export class DepartmentPaginationResponse {
  @Field(() => [Department])
  departments: Department[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  totalPages: number;
}
