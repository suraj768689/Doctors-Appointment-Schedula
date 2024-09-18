import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  specialty: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  experience: string; // e.g., "15 years"

  @Column({ type: 'varchar', length: 255, nullable: true })
  achievements: string; // e.g., "Gold medalist"

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];
}
