import { Request, Response } from 'express';
import QueryBus from '../../bus/QueryBus';
import GetProducersQuery from '../../application/queries/GetProducersQuery';

export default async (req: Request, res: Response, queryBus: QueryBus) => {
  try {
    const query = new GetProducersQuery();
    const producers = await queryBus.execute(query);
    res.status(200).json(producers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
