import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async byEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async create(dto: CreateUserDto) {
    const user = await this.userModel.create({ ...dto });
    return user;
  }

  async byId(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }
}
