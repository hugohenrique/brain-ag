import UpdateProducerCommand from '../commands/UpdateProducerCommand';
import { Producer } from '../../domain/model/Producer';
import IProducerRepository from '../../domain/repository/IProducerRepository';

export default class UpdateProducerHandler {
  private producerRepository: IProducerRepository;

  constructor(producerRepository: IProducerRepository) {
    this.producerRepository = producerRepository;
  }

  async handle(command: UpdateProducerCommand): Promise<void> {
    const existingProducer = await this.producerRepository.findById(command.id);
    if (!existingProducer) {
      throw new Error('Produtor não encontrado');
    }

    const updatedProducer = new Producer({ ...existingProducer.dataValues, ...command });
    await this.producerRepository.update(command.id, updatedProducer);
  }
}
