// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Appointment } from 'src/appointments/appointment.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string; // Password will be hashed

  @OneToMany(() => Appointment, appointment => appointment.user)
  appointments: Appointment[];
}
