import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema()
export class User extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
