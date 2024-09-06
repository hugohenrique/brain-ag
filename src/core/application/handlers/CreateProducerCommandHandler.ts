import { Producer } from '../../domain/model/Producer';
import IProducerRepository from '../../domain/repository/IProducerRepository';
import CreateProducerCommand from '../commands/CreateProducerCommand';

export default class CreateProducerCommandHandler {
  private producerRepository: IProducerRepository;

  constructor(producerRepository: IProducerRepository) {
    this.producerRepository = producerRepository;
  }

  async handle(command: CreateProducerCommand): Promise<void> {
    const producer = new Producer({ ...command });
    await this.producerRepository.save(producer);
  }
}
