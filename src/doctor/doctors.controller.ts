import { Controller, Get, Post, Put, Param, Body, NotFoundException } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto'; // Import if you created this DTO
import { Doctor } from './doctor.entity';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post('create')
  async createDoctor(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get(':id')
  async getDoctorById(@Param('id') id: string): Promise<Doctor> {
    const doctorId = parseInt(id, 10);
    return this.doctorsService.findOne(doctorId);
  }

  @Get()
  async getDoctors(): Promise<Doctor[]> {
    return this.doctorsService.findAll();
  }

  @Put(':id')
  async updateDoctor(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto // Use UpdateDoctorDto if created
  ): Promise<Doctor> {
    const doctorId = parseInt(id, 10);
    try {
      return this.doctorsService.update(doctorId, updateDoctorDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
