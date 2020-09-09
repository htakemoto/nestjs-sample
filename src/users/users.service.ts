import {
  Injectable,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new HttpException(`${id} is not found`, HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  async update(user: User): Promise<User> {
    const result = await this.usersRepository.findOne(user.id);
    if (!result) {
      throw new NotFoundException();
    }
    return await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.findOne(id);
    if (!result) {
      throw new NotFoundException();
    } else {
      await this.usersRepository.delete(id);
    }
  }
}
