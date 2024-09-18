// src/appointments/appointment.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../modules/users/schemas/user.entity';
import { Doctor } from '../doctor/doctor.entity';
import { Slot } from '../slots/slot.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.appointments, { nullable: false })
  user: User;

  @ManyToOne(() => Doctor, doctor => doctor.appointments, { nullable: false })
  doctor: Doctor;

  @ManyToOne(() => Slot, slot => slot.appointments, { nullable: false })
  slot: Slot;

  @Column({ type: 'timestamp' })
  appointment_date: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'varchar', default: 'scheduled' }) // Ensure this column is present
  status: string; // To keep track of appointment status
}
