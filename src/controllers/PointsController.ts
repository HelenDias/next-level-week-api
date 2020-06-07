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

  async show(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const point = await knex('points').where('id', id).first();

      const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title');

      return !! point
        ? response.json({ point, items })
        : response.status(400).json({ message: 'Ponto de coleta não encontrado' });
    } catch (e) {
      console.log(e);
      return response.status(400).json({ message: 'Erro ao buscar ponto de coleta' });
    }
  }
};

export default PointsController;
