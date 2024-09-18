import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from './create-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = this.doctorsRepository.create(createDoctorDto);
    return this.doctorsRepository.save(doctor);
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorsRepository.find();
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findOneBy({ id });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }

  async update(id: number, updateDoctorDto: Partial<CreateDoctorDto>): Promise<Doctor> {
    const doctor = await this.doctorsRepository.preload({
      id,
      ...updateDoctorDto,
    });

    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }

    return this.doctorsRepository.save(doctor);
  }
}
