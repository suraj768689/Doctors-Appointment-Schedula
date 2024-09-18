import { IsNotEmpty, IsInt, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  doctorId: number;

  @IsNotEmpty()
  @IsInt()
  slotId: number;

  @IsNotEmpty()
  @IsDateString()
  appointment_date: string;
}
