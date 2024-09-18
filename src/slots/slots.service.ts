import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slot } from './slot.entity';
import { CreateSlotDto } from './dto/create-slot.dto';

@Injectable()
export class SlotsService {
  constructor(
    @InjectRepository(Slot)
    private slotsRepository: Repository<Slot>,
  ) {}

  async create(createSlotDto: CreateSlotDto): Promise<Slot> {
    const slot = this.slotsRepository.create(createSlotDto);
    return this.slotsRepository.save(slot);
  }

  async findAll(): Promise<Slot[]> {
    return this.slotsRepository.find();
  }

  async findOne(id: number): Promise<Slot> {
    return this.slotsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.slotsRepository.delete(id);
  }
}
