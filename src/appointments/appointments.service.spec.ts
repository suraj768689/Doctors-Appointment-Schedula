import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, EntityManager, MoreThan, LessThan } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { User } from '../modules/users/schemas/user.entity';
import { Doctor } from '../doctor/doctor.entity';
import { Slot } from '../slots/slot.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,

    @InjectRepository(Slot)
    private slotsRepository: Repository<Slot>,

    private connection: Connection,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, userId: number): Promise<Appointment> {
    const { doctorId, slotId, appointment_date } = createAppointmentDto;

    return this.connection.transaction(async (manager: EntityManager) => {
      const user = await manager.findOne(User, { where: { id: userId } });
      const doctor = await manager.findOne(Doctor, { where: { id: doctorId } });
      const slot = await manager.findOne(Slot, { where: { id: slotId } });

      if (!user || !doctor || !slot) {
        throw new NotFoundException('User, Doctor, or Slot not found');
      }

      // Lock the slot row for pessimistic write
      const lockedSlot = await manager.findOne(Slot, {
        where: { id: slotId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!lockedSlot || lockedSlot.is_booked) {
        throw new ConflictException('Slot is no longer available');
      }

      // Create the appointment
      const appointment = this.appointmentsRepository.create({
        user,
        doctor,
        slot: lockedSlot,
        appointment_date,
      });

      // Update slot status to 'booked'
      lockedSlot.is_booked = true;
      await manager.save(Slot, lockedSlot);

      // Save the appointment
      return manager.save(Appointment, appointment);
    });
  }

  async cancel(id: number, userId: number): Promise<void> {
    return this.connection.transaction(async (manager: EntityManager) => {
      const appointment = await manager.findOne(Appointment, { where: { id } });

      if (!appointment) {
        throw new NotFoundException('Appointment not found');
      }

      if (appointment.user.id !== userId) {
        throw new ConflictException('You can only cancel your own appointments');
      }

      const slot = await manager.findOne(Slot, { where: { id: appointment.slot.id } });
      if (!slot) {
        throw new NotFoundException('Slot not found');
      }

      if (!slot.is_booked) {
        throw new ConflictException('Slot is already available');
      }

      // Update slot status to available and cancel the appointment in one transaction
      slot.is_booked = false;
      await manager.save(Slot, slot);

      // Update appointment status to canceled
      await manager.update(Appointment, id, { status: 'canceled' });
    });
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentsRepository.find();
  }

  async findOne(id: number): Promise<Appointment | null> {
    return this.appointmentsRepository.findOneBy({ id });
  }

  async findUpcomingAppointments(userId: number): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: {
        user: { id: userId },
        appointment_date: MoreThan(new Date()),
      },
    });
  }

  async findPastAppointments(userId: number): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: {
        user: { id: userId },
        appointment_date: LessThan(new Date()),
      },
    });
  }

  async findCanceledAppointments(userId: number): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: {
        user: { id: userId },
        status: 'canceled',
      },
    });
  }
}
