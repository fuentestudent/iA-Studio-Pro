const request = require('supertest');
const app = require('../server'); // Asegúrate de que esta ruta sea correcta

describe('GET /', () => {
  it('debería retornar "API Gateway para Optimización de Proyectos con IA" ', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('API Gateway para Optimización de Proyectos con IA');
  });
});