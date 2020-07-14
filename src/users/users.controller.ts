import {
  Controller,
  HttpCode, HttpStatus,
  HttpException,
  NotFoundException,
  NotAcceptableException,
  Get, Post, Put, Delete,
  Param, Body,
  ParseIntPipe
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  // POST /users
  // Body: {"username": "htakemoto", "age": 35}
  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    if (Object.keys(createUserDto).length === 0) {
      throw new NotAcceptableException();
    }
    let user = createUserDto as User
    return this.usersService.create(user);
  }

  // GET /users
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // GET /users/1
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = this.usersService.findOne(id);
    if (user == null) {
      throw new HttpException(`${id} is not found`, HttpStatus.NOT_FOUND);
    } else {
      return user
    }
  }

  // PUT /users/1
  // Body: {"id": "1", "username": "htakemoto", "age": 18}
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    if (Object.keys(updateUserDto).length === 0) {
      throw new NotAcceptableException();
    }
    const targetUser = this.usersService.findOne(id);
    if (targetUser == null) {
      throw new NotFoundException();
    } else {
      let user = updateUserDto as User
      user.id = id
      return this.usersService.update(user);
    }
  }

  // DELETE /users/1
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.findOne(id);
    if (user == null) {
      throw new NotFoundException();
    } else {
      this.usersService.remove(id);
    }
  }
}
