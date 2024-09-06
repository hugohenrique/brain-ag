import CreateProducerCommandHandler from './CreateProducerCommandHandler';
import CreateProducerCommand from '../commands/CreateProducerCommand';
import ProducerRepository from '../../infrastructure/persistence/ProducerRepository';
import { Producer, ProducerCreationAttributes } from '../../domain/model/Producer';

describe('CreateProducerCommandHandler', () => {
  let createProducerHandler: CreateProducerCommandHandler;
  let producerRepository: jest.Mocked<ProducerRepository>;

  beforeEach(() => {
    producerRepository = {
      save: jest.fn(),
    } as any;

    createProducerHandler = new CreateProducerCommandHandler(producerRepository);
  });

  it('should throw an error if the agricultural area and vegetation area exceed the total area', async () => {
    const producerAttributes: ProducerCreationAttributes = {
      cpfCnpj: '12345678901',
      name: 'Test Producer',
      farmName: 'Test Farm',
      city: 'Test City',
      state: 'TS',
      totalArea: 100,
      agriculturalArea: 70,
      vegetationArea: 40,
      crops: ['Wheat']
    };

    try {
      const command = new CreateProducerCommand(producerAttributes);
      await createProducerHandler.handle(command);
    } catch (error) {
      expect(error.message).toBe('Soma de área agricultável e vegetação não pode ser maior que a área total.');
    }
  });

  it('should create a producer successfully', async () => {
    const producerAttributes = {
      cpfCnpj: '123.456.789-01',
      name: 'Valid Producer',
      farmName: 'Valid Farm',
      city: 'Valid City',
      state: 'VA',
      totalArea: 100,
      agriculturalArea: 30,
      vegetationArea: 20,
      crops: ['Corn']
    };

    const command = new CreateProducerCommand(producerAttributes);
    await createProducerHandler.handle(command);

    const producer = Producer.build({ ...producerAttributes });
    producerRepository.save.mockResolvedValue(producer);
    expect(producerRepository.save).toHaveBeenCalledWith(producer);
  });
});
