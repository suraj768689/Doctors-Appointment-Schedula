import { IsInt, IsDate, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsInt()
  @IsNotEmpty()
  doctor_id: number;

  @IsDate()
  @IsNotEmpty()
  appointment_date: Date;
}
