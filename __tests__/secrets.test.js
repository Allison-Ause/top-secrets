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
  it('displays list of secrets to authenticated users only', async () => {
    const [agent] = await registerAndLogin();
    console.log(agent);
    const res = await agent.get('/api/v1/secrets');
    expect(res.status).toBe(200);
    console.log('res.body:', res.body);
    expect(res.body.length).toBe(2);
    expect(res.body[1].title).toEqual('007');
  });

  it('returns a 401 when not authenticated but trying to view secrets', async () => {
    const res = await request(app).get('/api/v1/secrets');

    expect(res.body).toEqual({
      message: 'Sign in to view',
      status: 401,
    });
  });
  afterAll(() => {
    pool.end();
  });
});
