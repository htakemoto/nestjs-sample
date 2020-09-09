import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo(): any {
    return {
      version: '1.0.0',
      environment: process.env.ENVIRONMENT,
      database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
      },
    };
  }
}
