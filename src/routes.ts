import express from 'express';
import knex from './database/connection';
import PointsController from './controllers/PointsController';

const routes = express.Router();
const pointsController = new PointsController();

routes.get('/items', async (request, response) => {
  const items = await knex('items').select('*');

  return response.json(items.map(item => ({
    ...item,
    image: `http://localhost:4000/uploads/${item.image}`,
  })));
});

routes.post('/points', pointsController.create);

export default routes;
