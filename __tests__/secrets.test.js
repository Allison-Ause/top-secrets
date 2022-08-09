const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? testUser.password;
  const agent = request.agent(app);
  const user = await UserService.create({ ...testUser, ...userProps });

  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({
    email,
    password,
  });
  return [agent, user];
};

const testUser = {
  email: 'test@test.com',
  password: '1234password',
};

describe('/api/v1/secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/api/v1/secrets displays list of secrets to authenticated users only', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.get('/api/v1/secrets');
    expect(res.body.length).toEqual(2);
  });
  afterAll(() => {
    pool.end();
  });
});
