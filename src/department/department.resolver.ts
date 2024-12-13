import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private departmentService: DepartmentService) {}

  @Mutation(() => Department)
  CreateDepartment(
    @Args('input') input: CreateDepartmentInput,
  ): Promise<Department> {
    return this.departmentService.createDepartment(input);
  }

  @Query(() => [Department])
  GetDepartments(): Promise<Department[]> {
    return this.departmentService.getDepartments();
  }

  @Mutation(() => Department)
  UpdateDepartment(
    @Args('id', { type: () => Int }) id: number,
    @Args('name') name: string,
  ): Promise<Department> {
    return this.departmentService.updateDepartment(id, name);
  }

  @Mutation(() => Boolean)
  DeleteDepartment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.departmentService.deleteDepartment(id);
  }
}
