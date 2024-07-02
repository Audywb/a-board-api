import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  community: string;
  title: string;
  body: string;
  username: string;
}

export class UpdatePostDto {
  username?: string;
  community?: string;
  title?: string;
  body?: string;
}