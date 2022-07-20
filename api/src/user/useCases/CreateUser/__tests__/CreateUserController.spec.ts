import { app } from '../../../../main';
import request from 'supertest';
import { mockUser } from '../../../../shared/tests/mockUser';

describe('Unit test: Create User [Controller]', () => {
  it('should be able to create a new user', async () => {
    const body = mockUser;
    const response = await request(app).post('/v1/user').send(body);

    expect(response.status).toBe(201);
    expect(JSON.parse(response.text)).toHaveProperty('id');
  });

  it('should not to be able to create a user with an email that already exists', async () => {
    const body = mockUser;
    const response = await request(app).post('/v1/user').send(body);
    const parse = JSON.parse(response.text);

    expect(response.status).toBe(400);
    expect(parse.msg).toEqual('User already registered. Try another email.');
  });
});
