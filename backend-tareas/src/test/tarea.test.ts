import request from 'supertest';
import app from '../app'; // ajusta ruta si es necesario

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
      .send({ titulo: 'Aprender testing', descripcion: 'Con Jest' });

    expect(response.status).toBe(201);
    expect(response.body.titulo).toBe('Aprender testing');
  });

});

/// GET
describe('GET /tareas/:id', () => {

  it('debe devolver 404 si la tarea no existe', async () => {
    const response = await request(app)
      .get('/tareas/999999');

    expect(response.status).toBe(404);
    expect(response.body.mensaje).toBe('Tarea no encontrada');
  });

});
