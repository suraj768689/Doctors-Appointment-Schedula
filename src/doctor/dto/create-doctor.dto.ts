import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  specialty: string;

  @IsString()
  @IsNotEmpty()
  experience: string;

  @IsString()
  @IsNotEmpty()
  achievements: string;
}
