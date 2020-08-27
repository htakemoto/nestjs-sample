import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: getRepositoryToken(User),
        useClass: Repository,
      }],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should return object after one create', async () => {
    const user1: User = { id: 1, firstName: 'Steve', lastName: 'Jobs', isActive: true };
    jest.spyOn(usersRepository, 'save').mockResolvedValueOnce(user1);
    expect(await usersService.create(user1)).toEqual(user1);
  });

  it('should return all for findAll', async () => {
    const user1: User = { id: 1, firstName: 'Steve', lastName: 'Jobs', isActive: true };
    const user2: User = { id: 2, firstName: 'Bill', lastName: 'Gates', isActive: true };
    jest.spyOn(usersRepository, 'find').mockResolvedValueOnce([user1, user2]);
    expect(await usersService.findAll()).toEqual([user1, user2]);
  });

  it('should return one for findOne', async () => {
    const user1: User = { id: 1, firstName: 'Steve', lastName: 'Jobs', isActive: true };
    jest.spyOn(usersRepository, 'findOne').mockResolvedValueOnce(user1);
    expect(await usersService.findOne(user1.id)).toEqual(user1);
  });

  it('should throw Exception for findOne', async () => {
    jest.spyOn(usersRepository, 'findOne').mockResolvedValueOnce(null);
    await expect(usersService.findOne(1)).rejects.toThrow('1 is not found');
  });

  it('should return object after one update', async () => {
    const user1: User = { id: 1, firstName: 'Steve', lastName: 'Jobs', isActive: true };
    jest.spyOn(usersRepository, 'findOne').mockResolvedValueOnce(user1);
    jest.spyOn(usersRepository, 'save').mockResolvedValueOnce(user1);
    expect(await usersService.update(user1)).toEqual(user1);
  });

  it('should throw Exception for one update', async () => {
    const user1: User = { id: 1, firstName: 'Steve', lastName: 'Jobs', isActive: true };
    jest.spyOn(usersRepository, 'findOne').mockResolvedValueOnce(null);
    await expect(usersService.update(user1)).rejects.toThrow();
  });

  it('should return null after one delete', async () => {
    const user1: User = { id: 1, firstName: 'Steve', lastName: 'Jobs', isActive: true };
    jest.spyOn(usersRepository, 'findOne').mockResolvedValueOnce(user1);
    jest.spyOn(usersRepository, 'delete').mockResolvedValueOnce(null);
    expect(await usersService.remove(user1.id)).toBeNull;
  });

  it('should throw Exception for delete', async () => {
    jest.spyOn(usersRepository, 'findOne').mockResolvedValueOnce(null);
    await expect(usersService.remove(1)).rejects.toThrow();
  });

});
