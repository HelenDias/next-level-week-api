import express from 'express';
import knex from './database/connection';
import omit from 'lodash/omit';

const routes = express.Router();

routes.get('/items', async (request, response) => {
  const items = await knex('items').select('*');

  return response.json(items.map(item => ({
    ...item,
    image: `http://localhost:4000/uploads/${item.image}`,
  })));
});

routes.post('/points', async (request, response) => {
  const { items } = request.body;

  const ids = await knex('points').insert({
    ...omit(request.body, 'items'),
    image: 'image-fake',
  });

  const pointItems = items.map((item_id: number) => ({
    item_id,
    point_id: ids[0],
    image: 'image-fake',
  }));

  await knex('point_items').insert(pointItems);

  return response.json({ success: true });
});

export default routes;
