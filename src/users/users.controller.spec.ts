import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { CreateUserDto, UpdateUserDto } from './dto';

describe('Users Controller', () => {
  let usersController: UsersController;
  let usersService: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should return object after one create', async () => {
    const user = { username: "htakemoto", age: 35 } as CreateUserDto;
    const result = await usersController.create(user);
    expect(result).toBeInstanceOf(Object);
  });

  it('should return array after one create operation', async () => {
    const user = { username: "htakemoto", age: 35 } as CreateUserDto;
    await usersController.create(user);
    const result = await usersController.findAll();
    expect(result.length).toBe(1);
  });

  it('should return object after one create operation', async () => {
    const user = { username: "htakemoto", age: 35 } as CreateUserDto;
    await usersController.create(user);
    const result = await usersController.findOne(1);
    expect(result).toBeInstanceOf(Object);
  });

  it('should update object', async () => {
    let user = { username: "htakemoto", age: 35 } as CreateUserDto;
    await usersController.create(user);
    user.age = 18;
    const result = await usersController.update(1, user as UpdateUserDto);
    expect(result.age).toBe(18);
  });

  it('should return null after removing object', async () => {
    let user = { username: "htakemoto", age: 35 } as CreateUserDto;
    await usersController.create(user);
    const result = await usersController.remove(1);
    expect(result).toBeNull;
  });
});
