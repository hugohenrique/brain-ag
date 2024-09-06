import { Request, Response } from 'express';
import QueryBus from '../../bus/QueryBus';
import GetDashboardDataQuery from '../../application/queries/GetDashboardDataQuery';

export default async (req: Request, res: Response, queryBus: QueryBus) => {
  try {
    const query = new GetDashboardDataQuery();
    const dashboardData = await queryBus.execute(query);
    res.status(200).json(dashboardData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
