import { Producer } from '../../domain/model/Producer';

export default interface IProducerRepository {
  save(producer: Producer): Promise<Producer>;
  update(id: string, producer: Producer): Promise<Producer | null>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Producer | null>;
  findAll(): Promise<Producer[]>;
}
