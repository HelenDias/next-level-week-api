import express from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (request, response) => {
  const items = await knex('items').select('*');

  return response.json(items.map(item => ({
    ...item,
    image: `http://localhost:4000/uploads/${item.image}`,
  })));
});

export default routes;
