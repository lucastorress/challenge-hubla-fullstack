import { app } from '../../../../main';
import request from 'supertest';
import { mockUser } from '../../../../shared/tests/mockUser';

describe('Unit test: Delete User [Controller]', () => {
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

  it('should be able to delete your own user that already exists', async () => {
    const response = await request(app)
      .delete(`/v1/user`)
      .set('Authorization', `Bearer ${token}`);
    const body = JSON.parse(response.text);

    expect(response.status).toBe(200);
    expect(body).toBe(true);
  });

  it('should not be able to delete your own user that dont exists anymore', async () => {
    const response = await request(app)
      .delete(`/v1/user`)
      .set('Authorization', `Bearer ${token}`);
    const body = JSON.parse(response.text);

    expect(response.status).toBe(400);
    expect(body.msg).toBe('User not found to be deleted.');
  });
});
