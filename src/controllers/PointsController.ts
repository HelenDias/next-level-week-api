import knex from '../database/connection';
import { Request, Response } from 'express';
import omit from 'lodash/omit';

class PointsController {
  async create(request: Request, response: Response) {
    const { items } = request.body;

    const trx = await knex.transaction();

    const point = {
      ...omit(request.body, 'items'),
      image: 'image-fake',
    };

    const ids = await trx('points').insert(point);

    const pointItems = items.map((item_id: number) => ({
      item_id,
      point_id: ids[0],
      image: 'image-fake',
    }));

    await trx('point_items').insert(pointItems);

    return response.json({
      ...point,
      id: ids[0],
    });
  }
};

export default PointsController;
