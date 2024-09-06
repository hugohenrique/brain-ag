import { Producer } from '../../domain/model/Producer';
import IProducerRepository from '../../domain/repository/IProducerRepository';
import GetProducersQuery from '../queries/GetProducersQuery';

export default class GetProducersHandler {
  private producerRepository: IProducerRepository;

  constructor(producerRepository: IProducerRepository) {
    this.producerRepository = producerRepository;
  }

  async handle(query: GetProducersQuery): Promise<Producer[]> {
    return await this.producerRepository.findAll();
  }
}
