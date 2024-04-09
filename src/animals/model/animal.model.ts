import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnimalsDocument = HydratedDocument<Animals>;

@Schema()
export class Animals {
  @Prop()
  animal_type_id: number;

  @Prop()
  photos: string;

  @Prop()
  unique_id: string;
}

export const AnimalsSchema = SchemaFactory.createForClass(Animals);
