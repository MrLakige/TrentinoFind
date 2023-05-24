// to finish, it doesn't work
// to complete for testing


const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('./app');

describe('GET /api/v1/giocatori', () => {

  // Moking giocatore.findOne method
  let findGiocatore;

  beforeAll( () => {
    const giocatore = require('./models/schemaGiocatore');
    findGiocatore = jest.spyOn(giocatore, 'findOne').mockImplementation((criterias) => {
      return {
        id: 12345678,
        email: 'test@mail.com'
      };
    });
  });

  afterAll(async () => {
    findGiocatore.mockRestore();
  });
  
  test('GET /api/v1/giocatori with no token should return 401', async () => {
    const response = await request(app).get('/api/v1/giocatori');
    expect(response.statusCode).toBe(401);
  });

  test('GET /api/v1/giocatori?token=<invalid> should return 403', async () => {
    const response = await request(app).get('/api/v1/giocatori?token=123456');
    expect(response.statusCode).toBe(403);
  });

  // create a valid token
  var payload = {
    email: 'test@mail.com'
  }
  var options = {
    expiresIn: 86400 // expires in 24 hours
  }
  var token = jwt.sign(payload, "supersecretkey", options);
      
  test('GET /api/v1/giocatori?token=<valid> should return 200', async () => {
    expect.assertions(1);
    const response = await request(app).get('/api/v1/giocatori?token='+token);
    expect(response.statusCode).toBe(200);
  });

  test('GET /api/v1/giocatori?token=<valid> should return user information', async () => {
    expect.assertions(2);
    const response = await request(app).get('/api/v1/giocatori?token='+token);
    const gamer = response.body;
    expect(gamer).toBeDefined();
    expect(gamer.email).toBe('test@mail.com');
  });
});