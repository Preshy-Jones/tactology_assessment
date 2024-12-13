import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';

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

  async updateDepartment(id: number, name: string): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    department.name = name;
    return this.departmentRepository.save(department);
  }

  async deleteDepartment(id: number): Promise<boolean> {
    const result = await this.departmentRepository.delete(id);
    return result.affected > 0;
  }
}
