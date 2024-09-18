// src/slots/slots.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './slot.entity';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Slot])],
  providers: [SlotsService],
  controllers: [SlotsController],
  exports: [SlotsService], // Exporting SlotsService if needed elsewhere
})
export class SlotsModule {}
