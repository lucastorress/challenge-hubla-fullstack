import { app } from '../../../../main';
import request from 'supertest';
import { mockUser } from '../../../../shared/tests/mockUser';

describe('Unit test: Get User [Controller]', () => {
  let token: string;

  beforeAll(async () => {
    const body = mockUser;
    await request(app).post('/v1/user').send(body);

    const auth = await request(app).post('/v1/auth/login').send({
      email: body.email,
      password: body.password,
    });
    token = JSON.parse(auth.text).token;
  });

  it('should be able to get user authenticated with role', async () => {
    const response = await request(app)
      .get(`/v1/user`)
      .set('Authorization', `Bearer ${token}`);
    const user = JSON.parse(response.text);

    expect(response.status).toBe(200);
    expect(user).toHaveProperty('id');
    expect(user).not.toHaveProperty('password');
    expect(user).toHaveProperty('role');
  });
});
