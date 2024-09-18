// src/slots/slots.controller.ts
import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { Slot } from './slot.entity';

@Controller('slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Get()
  async getAllSlots(): Promise<Slot[]> {
    return this.slotsService.findAll();
  }

  @Post('create')
  async createSlot(@Body() createSlotDto: CreateSlotDto): Promise<Slot> {
    return this.slotsService.create(createSlotDto);
  }

  @Delete(':id')
  async deleteSlot(@Param('id') id: string): Promise<void> {
    await this.slotsService.remove(+id);
  }

  @Get(':id')
  async getSlotById(@Param('id') id: string): Promise<Slot> {
    return this.slotsService.findOne(+id);
  }
}
