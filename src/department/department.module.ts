import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentResolver } from './department.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';

@Module({
  imports: [
    // Import TypeORM repositories for Department and SubDepartment
    TypeOrmModule.forFeature([Department, SubDepartment]),
  ],
  providers: [DepartmentResolver, DepartmentService],
})
export class DepartmentModule {}
