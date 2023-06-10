// to finish, it doesn't work
// to complete for testing

const request = require('supertest');
const app = require('../app');
const log = require('../../logger');

describe('GET /api/v1/oggetti', () => {

  // Moking Book.find method
  let oggettoSpy;
  // Moking Book.findById method
  let oggettoSpyFindById;

  beforeAll( () => {
    const oggetto = require('../models/schemaOggetto');
    oggettoSpy = jest.spyOn(oggetto, 'find').mockImplementation((criterias) => {
      return [{
        location: "46.45857997953086, 11.271157834960782",
        title: "oggetto nascosto 1",
        description: "test oggetto nascosto", 
        dimension: "test",
        difficulty: "easy",
      }];
    });
    oggettoSpyFindById = jest.spyOn(oggetto, 'findById').mockImplementation((id) => {
      if (id==1010)
        return {
            location: "46.45857997953086, 11.271157834960782",
            title: "oggetto nascosto 1",
            description: "test oggetto nascosto", 
            dimension: "test",
            difficulty: "easy",
        };
      else
        return {};
    });
  });

  afterAll(async () => {
    oggettoSpy.mockRestore();
    oggettoSpyFindById.mockRestore();
  });
  
  test('GET /api/v1/oggetti should respond with an array of objects', async () => {
    return request(app)
      .get('/api/v1/oggetti')
      .expect('Content-Type', /json/)
      .expect(200)
      .then( (res) => {
        if(res.body && res.body[0]) {
          expect(res.body[0]).toEqual({
            self: '/api/v1/oggetto',
            location: "46.45857997953086, 11.271157834960782",
            title: "oggetto nascosto 1",
            description: "test oggetto nascosto", 
            dimension: "test",
            difficulty: "easy",
          });
        }
      });
  });

  
  test('GET /api/v1/oggetti/:id should respond with json', async () => {
    return request(app)
      .get('/api/v1/oggetti/123456789')
      .expect('Content-Type', /json/)
      .expect(200, {
          self: '/api/v1/oggetti/123456789',
          location: "46.45857997953086, 11.271157834960782",
          title: "oggetto nascosto 1",
          description: "test oggetto nascosto", 
          dimension: "test",
          difficulty: "easy",
        });
  });

});