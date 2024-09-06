import DeleteProducerCommand from '../commands/DeleteProducerCommand';
import IProducerRepository from '../../domain/repository/IProducerRepository';

export default class DeleteProducerHandler {
  private producerRepository: IProducerRepository;

  constructor(producerRepository: IProducerRepository) {
    this.producerRepository = producerRepository;
  }

  async handle(command: DeleteProducerCommand): Promise<void> {
    await this.producerRepository.delete(command.id);
  }
}
