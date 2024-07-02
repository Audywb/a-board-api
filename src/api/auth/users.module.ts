import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from '../../schemas/user.schema';
import { UserService } from './users.service';
import { UserController } from './users.controller';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    ],
    providers: [UserService],
    controllers: [UserController],
  })
  export class UserModule {}