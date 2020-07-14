import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should return object after one create', async () => {
    const user = { username: "htakemoto", age: 35 } as User;
    const result = await usersService.create(user);
    expect(result).toBeInstanceOf(Object);
  });

  it('should return array after one create operation', async () => {
    const user = { username: "htakemoto", age: 35 } as User;
    await usersService.create(user);
    const result = await usersService.findAll();
    expect(result.length).toBe(1);
  });

  it('should return object after one create operation', async () => {
    const user = { username: "htakemoto", age: 35 } as User;
    await usersService.create(user);
    const result = await usersService.findOne(1);
    expect(result).toBeInstanceOf(Object);
  });

  it('should update object', async () => {
    let user = { username: "htakemoto", age: 35 } as User;
    await usersService.create(user);
    user.age = 18;
    const result = await usersService.update(user);
    expect(result.age).toBe(18);
  });

  it('should return null after removing object', async () => {
    let user = { username: "htakemoto", age: 35 } as User;
    await usersService.create(user);
    await usersService.remove(1);
    const result = await usersService.findOne(1);
    expect(result).toBeNull;
  });
});
