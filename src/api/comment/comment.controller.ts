import { Controller, Post, Body, Get, Param, Header } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from '../../schemas/comment.schema';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post("create")
  async createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.createComment(createCommentDto);
  }

  @Get('view/:postId')
  @Header('Access-Control-Allow-Origin', process.env.AIP_URL || 'http://localhost:3000')
  @Header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  @Header('Access-Control-Allow-Headers', 'Content-Type')
  async getCommentsByPostId(@Param('postId') postId: string): Promise<Comment[]> {
    return this.commentService.findCommentsByPostId(postId);
  }
}
