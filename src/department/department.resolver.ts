import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private departmentService: DepartmentService) {}

  @Mutation(() => Department)
  createDepartment(
    @Args('input') input: CreateDepartmentInput,
  ): Promise<Department> {
    return this.departmentService.createDepartment(input);
  }

  @Query(() => [Department])
  getDepartments(): Promise<Department[]> {
    return this.departmentService.getDepartments();
  }

  @Mutation(() => Department)
  updateDepartment(
    @Args('id', { type: () => Int }) id: number,
    @Args('name') name: string,
  ): Promise<Department> {
    return this.departmentService.updateDepartment(id, name);
  }

  @Mutation(() => Boolean)
  deleteDepartment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.departmentService.deleteDepartment(id);
  }
}
