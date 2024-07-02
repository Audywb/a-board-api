import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from '../../schemas/user.schema'

@Injectable()
export class UserService {
  constructor(@InjectModel(Users.name) private userModel: Model<Users>) { }

  async createUser(username: string): Promise<{ message: string, data: object }> {
    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) {
      return { message: 'Success', data: { id: existingUser._id, name: existingUser.username } };
    } else {
      const newUser = new this.userModel({ username });
      await newUser.save();
      const existingUser = await this.userModel.findOne({ username }).exec();
      return { message: 'Success', data: { id: existingUser._id, name: existingUser.username } };
    }
  }

  async findUserByUsername(username: string): Promise<Users> {
    return this.userModel.findOne({ username }).exec();
  }
}