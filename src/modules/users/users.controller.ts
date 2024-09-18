import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { JoiValidationPipe, registerSchema, loginSchema } from './validators/user.validator';  // Import validation
import { UserInterface } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get all users (returns id, username, email)
  @Get()
  async getAllUsers(): Promise<UserInterface[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  // Dummy endpoint for testing purposes
  @Get('dummy')
  async dummy() {
    const randomNumber = Math.random(); // Generate a random number between 0 and 1
    if (randomNumber < 0.5) {
      // Simulate a failure scenario
      return { success: false, message: 'Failed to perform operation' };
    } else {
      // Simulate a successful scenario
      return { success: true, message: 'Operation succeeded' };
    }
  }

  // Sign-up endpoint with Joi validation
  @Post('sign-up')
  @UsePipes(new JoiValidationPipe(registerSchema))
  async signUp(@Body() registerDto: any) {
    const user = await this.usersService.createUser(registerDto);
    return { success: true, message: 'User registered successfully', user };
  }

  // Sign-in endpoint with Joi validation
  @Post('sign-in')
  @UsePipes(new JoiValidationPipe(loginSchema))
  async signIn(@Body() loginDto: any) {
    const user = await this.usersService.validateUser(loginDto);
    if (user) {
      return { success: true, message: 'User signed in successfully', user };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  }
}
