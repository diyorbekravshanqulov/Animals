import { Injectable } from '@nestjs/common';
import { CreateAnimalsTypeDto } from './dto/create-animals_type.dto';
import { UpdateAnimalsTypeDto } from './dto/update-animals_type.dto';

@Injectable()
export class AnimalsTypeService {
  create(createAnimalsTypeDto: CreateAnimalsTypeDto) {
    return 'This action adds a new animalsType';
  }

  findAll() {
    return `This action returns all animalsType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} animalsType`;
  }

  update(id: number, updateAnimalsTypeDto: UpdateAnimalsTypeDto) {
    return `This action updates a #${id} animalsType`;
  }

  remove(id: number) {
    return `This action removes a #${id} animalsType`;
  }
}
