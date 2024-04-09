import { Module } from '@nestjs/common';
import { AnimalsTypeService } from './animals_type.service';
import { AnimalsTypeController } from './animals_type.controller';

@Module({
  controllers: [AnimalsTypeController],
  providers: [AnimalsTypeService],
})
export class AnimalsTypeModule {}
