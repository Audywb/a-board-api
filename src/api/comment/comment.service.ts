import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from '../../schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { username, comment, postId } = createCommentDto;
    const create_at = new Date();
    // console.log(username, comment, postId, create_at)
    const postObjectId = new Types.ObjectId(postId);
    const newComment = new this.commentModel({ username, comment, postId:postObjectId, create_at });
    return newComment.save();
  }

  async findCommentsByPostId(postId: string): Promise<Comment[]> {
    const postObjectId = new Types.ObjectId(postId);
    return await this.commentModel.find({ postId: postObjectId }).exec();
  }
}
