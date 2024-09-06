import { Request, Response } from 'express';
import CommandBus from '../../bus/CommandBus';
import UpdateProducerCommand from '../../commands/UpdateProducerCommand';

export default async (req: Request, res: Response, commandBus: CommandBus) => {
  try {
    const command = new UpdateProducerCommand(req.params.id, req.body);
    const producer = await commandBus.execute(command);
    res.status(200).json(producer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
