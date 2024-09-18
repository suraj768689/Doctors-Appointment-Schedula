import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  specialty: string;

  @IsString()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional() // Make experience optional
  experience?: string; 

  @IsString()
  @IsOptional() // Make achievements optional
  achievements?: string;
}
