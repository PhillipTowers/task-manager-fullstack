jest.mock("../middlewares/auth.middleware", () => ({
  authMiddleware: (
    req: any,
    res: any,
    next: any
  ) => {
    req.userId = "17f60450-90c1-4cd9-93eb-8b0d5159126f";
    next();
  },
}));

import request from 'supertest';
import app from '../app';

/// POST
describe('POST /tareas', () => {

  it('debe devolver 400 si el titulo está vacío', async () => {
    const response = await request(app)
      .post('/tareas')
      .send({ titulo: '' });

    expect(response.status).toBe(400);
    expect(response.body.mensaje).toBe('Error de validación');
  });

  it('debe crear una tarea correctamente y devolver 201', async () => {
    const response = await request(app)
      .post('/tareas')
      .send({
        titulo: 'Aprender testing',
        descripcion: 'Con Jest'
      });

    expect(response.status).toBe(201);
    expect(response.body.titulo).toBe('Aprender testing');
  });

});

/// GET
describe('GET /tareas/:id', () => {

  it('debe devolver 404 si la tarea no existe', async () => {
    const response = await request(app)
      .get('/tareas/550e8400-e29b-41d4-a716-446655440999');

    expect(response.status).toBe(404);
    expect(response.body.mensaje).toBe('Tarea no encontrada');
  });

});