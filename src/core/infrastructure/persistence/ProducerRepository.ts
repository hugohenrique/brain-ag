import IProducerRepository from '../../domain/repository/IProducerRepository';
import { Producer, ProducerCreationAttributes } from '../../domain/model/Producer';

export default class ProducerRepository implements IProducerRepository {
  async save(producer: ProducerCreationAttributes): Promise<Producer> {
    const createdProducer = await Producer.create({
      cpfCnpj: producer.cpfCnpj,
      name: producer.name,
      farmName: producer.farmName,
      city: producer.city,
      state: producer.state,
      totalArea: producer.totalArea,
      agriculturalArea: producer.agriculturalArea,
      vegetationArea: producer.vegetationArea,
      crops: producer.crops,
    });

    return createdProducer;
  }

  async update(id: string, producer: Producer): Promise<Producer | null> {
    const existingProducer = await Producer.findByPk(id);
    if (!existingProducer) {
      return null;
    }

    await existingProducer.update(producer.dataValues);
    return existingProducer;
  }

  async delete(id: string): Promise<void> {
    const producer = await Producer.findByPk(id);
    if (producer) {
      await producer.destroy();
    }
  }

  async findById(id: string): Promise<Producer | null> {
    const producer = await Producer.findByPk(id);
    return producer ? producer : null;
  }

  async findAll(): Promise<Producer[]> {
    const producers = await Producer.findAll();
    return producers;
  }
}
