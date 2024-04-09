import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { SpeciallityModule } from './speciallity/speciallity.module';
import { WorkerModule } from './worker/worker.module';
import { VaccinationHistoryModule } from './vaccination_history/vaccination_history.module';
import { VaccineModule } from './vaccine/vaccine.module';
import { AnimalsModule } from './animals/animals.module';
import { AnimalsTypeModule } from './animals_type/animals_type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdminModule,
    SpeciallityModule,
    WorkerModule,
    VaccinationHistoryModule,
    VaccineModule,
    AnimalsModule,
    AnimalsTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
