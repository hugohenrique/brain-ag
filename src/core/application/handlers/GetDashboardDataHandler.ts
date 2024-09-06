import GetDashboardDataQuery from '../queries/GetDashboardDataQuery';
import IProducerRepository from '../../domain/repository/IProducerRepository';

export default class GetDashboardDataHandler {
  private producerRepository: IProducerRepository;

  constructor(producerRepository: IProducerRepository) {
    this.producerRepository = producerRepository;
  }

  async handle(query: GetDashboardDataQuery): Promise<any> {
    const producers = await this.producerRepository.findAll();
    const totalFarms = producers.length;
    const totalArea = producers.reduce((sum, producer) => sum + producer.totalArea, 0);

    const statesDistribution = producers.reduce((acc, producer) => {
      acc[producer.state] = (acc[producer.state] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const cropsDistribution = producers.reduce((acc, producer) => {
      producer.crops.forEach(crop => {
        acc[crop] = (acc[crop] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const landUse = {
      agriculturalArea: producers.reduce((sum, producer) => sum + producer.agriculturalArea, 0),
      vegetationArea: producers.reduce((sum, producer) => sum + producer.vegetationArea, 0),
    };

    return {
      totalFarms,
      totalArea,
      statesDistribution,
      cropsDistribution,
      landUse,
    };
  }
}
