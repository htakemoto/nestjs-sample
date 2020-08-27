import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, {
        provide: getRepositoryToken(User),
        useClass: Repository,
      }],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should return object after one create', async () => {
    const dto: CreateUserDto = { firstName: 'Steve', lastName: 'Jobs', isActive: true };
    const user1: User = { id: 1, firstName: 'Steve', lastName: 'Jobs', isActive: true };
    jest.spyOn(usersService, 'create').mockResolvedValueOnce(user1);
    expect(await usersController.create(dto)).toEqual(user1);
  });

  it('should return all for findAll', async () => {
    const user1: User = { id: 1, firstName: 'Steve', lastName: 'Jobs', isActive: true };
    const user2: User = { id: 2, firstName: 'Bill', lastName: 'Gates', isActive: true };
    jest.spyOn(usersService, 'findAll').mockResolvedValueOnce([user1, user2]);
    expect(await usersController.findAll()).toEqual([user1, user2]);
  });

  it('should return one for findOne', async () => {
    const user1: User = { id: 1, firstName: 'Steve', lastName: 'Jobs', isActive: true };
    jest.spyOn(usersService, 'findOne').mockResolvedValueOnce(user1);
    expect(await usersController.findOne(user1.id)).toEqual(user1);
  });

  it('should return object after one update', async () => {
    const dto: UpdateUserDto = { firstName: 'Steve', lastName: 'Jobs', isActive: true };
    const user1: User = { id: 1, firstName: 'Steve', lastName: 'Jobs', isActive: true };
    jest.spyOn(usersService, 'update').mockResolvedValueOnce(user1);
    expect(await usersController.update(1, dto)).toEqual(user1);
  });

  it('should return null after one delete', async () => {
    const user1: User = { id: 1, firstName: 'Steve', lastName: 'Jobs', isActive: true };
    jest.spyOn(usersService, 'remove').mockResolvedValueOnce(null);
    expect(await usersController.remove(user1.id)).toBeNull;
  });
});
