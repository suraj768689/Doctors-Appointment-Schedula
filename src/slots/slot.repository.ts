// src/slots/slot.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { Slot } from './slot.entity';

@EntityRepository(Slot)
export class SlotRepository extends Repository<Slot> {}
