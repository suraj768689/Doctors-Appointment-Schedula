// src/appointments/appointments.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { Appointment } from './appointment.entity';
import { User } from '../modules/users/schemas/user.entity';
import { Doctor } from '../doctor/doctor.entity';
import { Slot } from '../slots/slot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, User, Doctor, Slot]),
  ],
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
