// src/slots/slot.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';

@Entity('slots')
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;

  @Column({ type: 'boolean', default: false })
  is_booked: boolean;

  @OneToMany(() => Appointment, appointment => appointment.slot)
  appointments: Appointment[];
}
