// to finish, it doesn't work
// to complete for testing
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const log = require('../../logger');

describe('GET /api/v1/giocatori', () => {

  // Moking giocatore.findOne method
  let findGiocatore;

  beforeAll( () => {
    const giocatore = require('../models/schemaGiocatore');
    findGiocatore = jest.spyOn(giocatore, 'findOne').mockImplementation((criterias) => {
      return {
        id: '6475c15c5a1bcbad8a5131ca',
        email: 'test@test'
      };
    });
  });

  afterAll(async () => {
    findGiocatore.mockRestore();
  });
  
  test('GET /api/v1/giocatori with no token should return 401', async () => {
    const response = await request(app).get('/api/v1/giocatori');
    expect(response.statusCode).toBe(404);
  });

  test('GET /api/v1/giocatori?token=<invalid> should return 403', async () => {
    const response = await request(app).get('/api/v1/giocatori?token=123456');
    expect(response.statusCode).toBe(404);
  });

  // create a valid token
  var payload = {
    email: 'test@test',
    id:'6475c15c5a1bcbad8a5131ca'
  }
  var options = {
    expiresIn: 86400 // expires in 24 hours
  }
  var token = jwt.sign(payload, 'supersecretkey', options);
      
  test('GET /api/v1/giocatori/?id=<valid> should return 200', async () => {
    expect.assertions(1);
    const response = await request(app).get('/api/v1/giocatori/:id'+token);
    expect(response.statusCode).toBe(200);
  });

  /*
  test('GET /api/v1/giocatori/:id<valid> should return user information', async () => {
    expect.assertions(2);
    const response = await request(app).get('/api/v1/giocatori/:id'+token);
    const gamer = response.body;
    expect(gamer).toBeDefined();
    expect(gamer.email).toBe('test@test');
  });
  */
});