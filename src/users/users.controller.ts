import {
  Controller,
  HttpCode,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // POST /users
  // Body: {"firstName": "Steve", "lastName": "Jobs", "isActive": true}
  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto as User);
  }

  // GET /users
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  // GET /users/1
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }

  // PUT /users/1
  // Body: {"firstName": "Steve", "lastName": "Jobs", "isActive": false}
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = updateUserDto as User;
    user.id = id;
    return await this.usersService.update(user);
  }

  // DELETE /users/1
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
  }
}
