import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SubDepartment } from './entities/sub-department.entity';
import { UpdateDepartmentInput } from './dto/update-department.input';

@ApiTags('Department')
@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private departmentService: DepartmentService) {}

  @ApiOperation({ summary: 'Create Department' })
  @ApiBody({ type: CreateDepartmentInput })
  @ApiResponse({ status: 201, type: Department })
  @ApiBearerAuth()
  @Mutation(() => Department)
  CreateDepartment(
    @Args('input') input: CreateDepartmentInput,
  ): Promise<Department> {
    return this.departmentService.createDepartment(input);
  }

  @ApiOperation({ summary: 'Get Departments' })
  @ApiResponse({ status: 200, type: [Department] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiBearerAuth()
  @Query(() => [Department])
  GetDepartments(): Promise<Department[]> {
    return this.departmentService.getDepartments();
  }

  @ApiOperation({ summary: 'Update Department' })
  @ApiBody({ type: CreateDepartmentInput })
  @ApiResponse({ status: 200, type: Department })
  @ApiBearerAuth()
  @Mutation(() => Department)
  UpdateDepartment(
    @Args('input') input: UpdateDepartmentInput,
  ): Promise<Department> {
    return this.departmentService.updateDepartment(input);
  }

  @ApiOperation({ summary: 'Delete Department' })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiBearerAuth()
  @Mutation(() => Boolean)
  DeleteDepartment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.departmentService.deleteDepartment(id);
  }

  //update sub-department
  @Mutation(() => SubDepartment)
  UpdateSubDepartment(
    @Args('id', { type: () => Int }) id: number,
    @Args('name') name: string,
  ): Promise<SubDepartment> {
    return this.departmentService.updateSubDepartment(id, name);
  }

  //delete sub-department
  @Mutation(() => Boolean)
  DeleteSubDepartment(
    @Args('id', { type: () => Int }) id: number,
    @Args('subDepartmentId', { type: () => Int }) subDepartmentId: number,
  ): Promise<boolean> {
    return this.departmentService.deleteSubDepartment(id, subDepartmentId);
  }

  // Add new sub-department
  @Mutation(() => SubDepartment)
  AddSubDepartment(
    @Args('departmentId', { type: () => Int }) id: number,
    @Args('name') name: string,
  ): Promise<SubDepartment> {
    return this.departmentService.addSubDepartment(id, name);
  }
}
