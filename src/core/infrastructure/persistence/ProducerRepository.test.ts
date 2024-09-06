import ProducerRepository from './ProducerRepository';
import { Producer, ProducerCreationAttributes } from '../../domain/model/Producer';

jest.mock('../../domain/model/Producer');

describe('ProducerRepository', () => {
  let producerRepository: ProducerRepository;

  beforeEach(() => {
    producerRepository = new ProducerRepository();
  });

  it('deve criar um novo produtor rural', async () => {
    const producerData: ProducerCreationAttributes = {
      cpfCnpj: '039.293.029-21',
      name: 'João Silva',
      farmName: 'Fazenda Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      totalArea: 1000,
      agriculturalArea: 700,
      vegetationArea: 300,
      crops: ['Sisal']
    };

    (Producer.create as jest.Mock).mockResolvedValue(producerData);

    const createdProducer = await producerRepository.save(producerData);

    expect(Producer.create).toHaveBeenCalledWith(producerData);
    expect(createdProducer).toEqual(producerData);
  });

  it('deve retornar uma lista de produtores', async () => {
    const producers = [
      { name: 'João Silva', farmName: 'Fazenda Bela Vista' },
      { name: 'Maria Souza', farmName: 'Fazenda Rio Claro' },
    ];

    (Producer.findAll as jest.Mock).mockResolvedValue(producers);

    const result = await producerRepository.findAll();

    expect(Producer.findAll).toHaveBeenCalled();
    expect(result).toEqual(producers);
  });
});
