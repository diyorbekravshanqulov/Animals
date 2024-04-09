import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SpeciallityDocument = HydratedDocument<Speciallity>;

@Schema()
export class Speciallity {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;
}

export const SpeciallitySchema = SchemaFactory.createForClass(Speciallity);
