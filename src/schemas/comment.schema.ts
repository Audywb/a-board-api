import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Comment {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  postId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  comment: string;

  @Prop({ required: true })
  username: string;

  @Prop({ default: Date.now })
  create_at: Date;
}

export type CommentDocument = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);