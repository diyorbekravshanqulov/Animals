import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Speciallity } from '../speciallity/schemas/speciallity.schema';
import { Worker } from './schemas/worker.schema';

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker.name) private workerModel: Model<Worker>,
    @InjectModel(Speciallity.name) private speciallityModel: Model<Speciallity>,
  ) {}

  async create(createWorkerDto: CreateWorkerDto) {
    const { speciallity_id } = createWorkerDto;
    const spec = await this.speciallityModel.findById(speciallity_id);

    if (!spec) {
      throw new BadRequestException('Not found Speciallity');
    }
    const worker = await this.workerModel.create(createWorkerDto);

    return worker;
  }
  findAll() {
    return this.workerModel.find().populate("speciallity_id")
  }

  findOne(id: number) {
    return `This action returns a #${id} worker`;
  }

  update(id: number, updateWorkerDto: UpdateWorkerDto) {
    return `This action updates a #${id} worker`;
  }

  remove(id: number) {
    return `This action removes a #${id} worker`;
  }
}
