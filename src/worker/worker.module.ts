import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Worker, WorkerSchema } from './schemas/worker.schema';
import { Speciallity, SpeciallitySchema } from '../speciallity/schemas/speciallity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Worker.name,
        schema: WorkerSchema,
      },
      {
        name: Speciallity.name,
        schema: SpeciallitySchema,
      },
    ]),
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
