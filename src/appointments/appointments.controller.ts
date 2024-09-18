import { Controller, Post, Get, Delete, Param, Body, HttpCode, HttpStatus, NotFoundException, Request, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './appointment.entity';
import { JwtAuthGuard } from '../modules/auth/jwt-auth.guard'; // Import your JWT guard

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(JwtAuthGuard) // Protect the endpoint with JWT authentication
  @Post('create')
  async createAppointment(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Request() req: any // Extract the request object to get user information
  ): Promise<Appointment> {
    const userId = req.user.id; // Extract user ID from the JWT payload
    return this.appointmentsService.create(createAppointmentDto, userId);
  }

  @UseGuards(JwtAuthGuard) // Protect the endpoint with JWT authentication
  @Get('upcoming')
  async getUpcomingAppointments(
    @Request() req: any // Extract the request object to get user information
  ): Promise<Appointment[]> {
    const userId = req.user.id; // Extract user ID from the JWT payload
    return this.appointmentsService.findUpcomingAppointments(userId);
  }

  @UseGuards(JwtAuthGuard) // Protect the endpoint with JWT authentication
  @Get('past')
  async getPastAppointments(
    @Request() req: any // Extract the request object to get user information
  ): Promise<Appointment[]> {
    const userId = req.user.id; // Extract user ID from the JWT payload
    return this.appointmentsService.findPastAppointments(userId);
  }

  @UseGuards(JwtAuthGuard) // Protect the endpoint with JWT authentication
  @Get('cancelled')
  async getCancelledAppointments(
    @Request() req: any // Extract the request object to get user information
  ): Promise<Appointment[]> {
    const userId = req.user.id; // Extract user ID from the JWT payload
    return this.appointmentsService.findCanceledAppointments(userId);
  }

  @UseGuards(JwtAuthGuard) // Protect the endpoint with JWT authentication
  @Delete('cancel/:id')
  async cancelAppointment(
    @Param('id') id: number,
    @Request() req: any // Extract the request object to get user information
  ): Promise<string> {
    try {
      const userId = req.user.id; // Extract user ID from the JWT payload
      await this.appointmentsService.cancel(id, userId);
      return 'Appointment canceled successfully';
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
