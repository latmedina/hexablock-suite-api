import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../../src/app.module';

describe('GET /health', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should_return_ok_when_api_is_running', async () => {
    // Arrange
    const http = request(app.getHttpServer());

    // Act
    const response = await http.get('/health');

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});
