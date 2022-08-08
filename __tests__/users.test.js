const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const testUser = {
  email: 'test@test.com',
  password: '1234password',
};

describe('/api/v1/users routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/api/v1/users registers a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(testUser);
    const { email } = testUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      email,
    });
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
