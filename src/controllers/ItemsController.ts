import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
  async index(request: Request, response: Response) {
    const items = await knex('items').select('*');

    return response.json(items.map(item => ({
      ...item,
      image: `http://localhost:4000/uploads/${item.image}`,
    })));
  }
};

export default ItemsController;
