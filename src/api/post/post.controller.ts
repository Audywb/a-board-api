import { Controller, Post, Get, Body, Query, Header, Put, Param, NotFoundException, Delete  } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto/create-post.dto';
import { Posts } from '../../schemas/post.schema';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  async createPost(@Body() createPostDto: CreatePostDto): Promise<{ message: string, data: string }> {
    const { username, community, title, body } = createPostDto;
    return this.postService.createPost(username, community, title, body);
  }

  @Get('by-username')
  @Header('Access-Control-Allow-Origin', process.env.AIP_URL || 'http://localhost:3000')
  @Header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  @Header('Access-Control-Allow-Headers', 'Content-Type')
  async getPostsByUsername(@Query('username') username: string): Promise<Posts[]> {
    return this.postService.findPostByusername(username);
  }

  @Get('by-id')
  @Header('Access-Control-Allow-Origin', process.env.AIP_URL || 'http://localhost:3000')
  @Header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  @Header('Access-Control-Allow-Headers', 'Content-Type')
  async getPostsById(@Query('id') id: string): Promise<Posts[]> {
    return this.postService.findPostById(id);
  }

  @Get('all-post')
  @Header('Access-Control-Allow-Origin', process.env.AIP_URL || 'http://localhost:3000')
  @Header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  @Header('Access-Control-Allow-Headers', 'Content-Type')
  async getAllPost() {
    return this.postService.findAllPostsAndCommentCounts();
  }

  @Put('update/:id')
  async updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<{ message: string }> {
    try {
      const result = await this.postService.updatePostById(id, updatePostDto);
      return result;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete('delete/:id')
  async deletePostById(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.postService.deletePostById(id);
      return { message: 'Post deleted successfully' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

}