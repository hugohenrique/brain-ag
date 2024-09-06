import { Request, Response } from 'express';
import CommandBus from '../../bus/CommandBus';
import CreateProducerCommand from '../../commands/CreateProducerCommand';

export default async (req: Request, res: Response, commandBus: CommandBus) => {
  try {
    const command = new CreateProducerCommand(req.body);
    const producer = await commandBus.execute(command);
    res.status(201).json(producer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
