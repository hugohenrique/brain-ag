import { Request, Response } from 'express';
import CommandBus from '../../bus/CommandBus';
import DeleteProducerCommand from '../../commands/DeleteProducerCommand';

export default async (req: Request, res: Response, commandBus: CommandBus) => {
  try {
    const command = new DeleteProducerCommand(req.params.id);
    await commandBus.execute(command);
    res.status(200).json({ message: 'Produtor deletado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
