import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Animals, AnimalsSchema } from './model/animal.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Animals.name,
        schema: AnimalsSchema,
      },
    ]),
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
