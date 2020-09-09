import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { User } from '../src/users/user.entity';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<User>;

  process.env.DB_HOST = '127.0.0.1';
  process.env.DB_PORT = '5432';
  process.env.DB_DATABASE = 'postgres';
  process.env.DB_USERNAME = 'postgres';
  process.env.DB_PASSWORD = 'postgres';

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        UsersModule,
        // Use the e2e_test database to run the tests
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT, 10),
          database: process.env.DB_DATABASE,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          entities: [User],
          synchronize: true,
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    repository = module.get('UserRepository');
    await repository.query(`DELETE FROM public.user;`);
    await repository.query(`ALTER SEQUENCE user_id_seq RESTART WITH 1;`);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST)', () => {
    const req = { firstName: 'Steve', lastName: 'Jobs', isActive: true };
    const res = { id: 1, firstName: 'Steve', lastName: 'Jobs', isActive: true };
    return request(app.getHttpServer())
      .post('/users')
      .send(req)
      .expect(201)
      .expect(res);
  });

  it('/users (GET)', () => {
    const res = [
      { id: 1, firstName: 'Steve', lastName: 'Jobs', isActive: true },
    ];
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(res);
  });

  it('/users/1 (GET)', () => {
    const res = { id: 1, firstName: 'Steve', lastName: 'Jobs', isActive: true };
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect(res);
  });

  it('/users/1 (PUT)', () => {
    const req = {
      id: 1,
      firstName: 'Steve',
      lastName: 'Jobs',
      isActive: false,
    };
    return request(app.getHttpServer())
      .put('/users/1')
      .send(req)
      .expect(200)
      .expect(req);
  });

  it('/users/1 (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/users/1')
      .expect(200)
      .expect({});
  });
});
