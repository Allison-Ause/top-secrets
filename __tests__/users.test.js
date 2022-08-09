const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const testUser = {
  email: 'test@test.com',
  password: '1234password',
};

describe('/api/v1/users routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/ registers a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(testUser);
    const { email } = testUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      email,
    });
  });

  it('/sessions signs in an existing user', async () => {
    await request(app).post('/api/v1/users').send(testUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'test@test.com', password: '1234password' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Successful Login!');
  });

  afterAll(() => {
    pool.end();
  });
});

/*
  it('example test - delete me!', () => {
    expect(1).toEqual(1);
  });
*/
