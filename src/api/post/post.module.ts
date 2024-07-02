import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostSchema } from '../../schemas/post.schema';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { CommentModule } from '../comment/comment.module';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),
      CommentModule
    ],
    providers: [PostService],
    controllers: [PostController],
  })
  export class PostModule {}