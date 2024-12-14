import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(SubDepartment)
    private subDepartmentRepository: Repository<SubDepartment>,
  ) {}

  async createDepartment(input: CreateDepartmentInput): Promise<Department> {
    const department = this.departmentRepository.create({
      name: input.name,
      subDepartments: input.subDepartments?.map((subDept) =>
        this.subDepartmentRepository.create({ name: subDept.name }),
      ),
    });

    return this.departmentRepository.save(department);
  }

  async getDepartments(): Promise<Department[]> {
    return this.departmentRepository.find();
  }

  async updateDepartment(input: UpdateDepartmentInput): Promise<Department> {
    // Find the existing department
    const department = await this.departmentRepository.findOne({
      where: { id: input.id },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${input.id} not found`);
    }

    // Update department name
    department.name = input.name;

    // Handle sub-departments
    if (input.subDepartments) {
      // Process existing and new sub-departments
      const existingSubDepartments = department.subDepartments || [];
      const updatedSubDepartments: SubDepartment[] = [];

      for (const subDeptInput of input.subDepartments) {
        if (subDeptInput.id) {
          // Update existing sub-department
          const existingSubDept = existingSubDepartments.find(
            (sd) => sd.id === subDeptInput.id,
          );

          if (existingSubDept) {
            existingSubDept.name = subDeptInput.name;
            updatedSubDepartments.push(
              await this.subDepartmentRepository.save(existingSubDept),
            );
          }
        } else {
          // Create new sub-department
          const newSubDept = this.subDepartmentRepository.create({
            name: subDeptInput.name,
            department,
          });
          updatedSubDepartments.push(
            await this.subDepartmentRepository.save(newSubDept),
          );
        }
      }

      // Remove sub-departments that are not in the input
      const subDeptsToRemove = existingSubDepartments.filter(
        (sd) =>
          !input.subDepartments.some(
            (inputSubDept) => inputSubDept.id === sd.id,
          ),
      );

      await this.subDepartmentRepository.remove(subDeptsToRemove);

      department.subDepartments = updatedSubDepartments;
    }

    // Save the updated department
    return this.departmentRepository.save(department);
  }

  async deleteDepartment(id: number): Promise<boolean> {
    const result = await this.departmentRepository.delete(id);
    return result.affected > 0;
  }

  async updateSubDepartment(id: number, name: string): Promise<SubDepartment> {
    const subDepartment = await this.subDepartmentRepository.findOne({
      where: { id: id },
    });

    if (!subDepartment) {
      throw new NotFoundException(`SubDepartment with ID ${id} not found`);
    }

    subDepartment.name = name;
    return this.subDepartmentRepository.save(subDepartment);
  }

  async deleteSubDepartment(
    id: number,
    subDepartmentId: number,
  ): Promise<boolean> {
    const result = await this.subDepartmentRepository.delete(subDepartmentId);
    return result.affected > 0;
  }

  async addSubDepartment(
    departmentId: number,
    name: string,
  ): Promise<SubDepartment> {
    const department = await this.departmentRepository.findOne({
      where: { id: departmentId },
    });

    if (!department) {
      throw new NotFoundException(
        `Department with ID ${departmentId} not found`,
      );
    }

    const subDepartment = this.subDepartmentRepository.create({
      name,
      department,
    });

    return this.subDepartmentRepository.save(subDepartment);
  }
}
