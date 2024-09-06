import { Producer } from './Producer';

describe('Producer model', () => {
  it('should throw an error if agriculturalArea + vegetationArea > totalArea', async () => {
    try {
      const invalidProducer = Producer.build({
        cpfCnpj: '12345678901',
        name: 'John Doe',
        farmName: 'Doe Farm',
        city: 'Cityville',
        state: 'Stateville',
        totalArea: 100,
        agriculturalArea: 60,
        vegetationArea: 50,  // Soma 110, maior que totalArea
        crops: ['Soja'],
      });

      await invalidProducer.validate();
    } catch (error) {
      expect(error.message).toBe('Validation error: Soma de área agricultável e vegetação não pode ser maior que a área total.');
    }
  });

  it('should throw an error if CPF/CNPJ is invalid', async () => {
    try {
      const invalidCpfProducer = Producer.build({
        cpfCnpj: '123', // CPF inválido
        name: 'John Doe',
        farmName: 'Fazenda 1',
        city: 'São Paulo',
        state: 'SP',
        totalArea: 100,
        agriculturalArea: 50,
        vegetationArea: 30,
        crops: ['Soja'],
      });
      await invalidCpfProducer.validate();
      } catch (error) {
      expect(error.message).toBe('Validation error: CPF/CNPJ inválido.');
    }
  });
  it('should accept multiple crops', async () => {
    const producer = Producer.build({
      cpfCnpj: '12345678901',
      name: 'Crop Producer',
      farmName: 'Crop Farm',
      city: 'Crop City',
      state: 'CP',
      totalArea: 100,
      agriculturalArea: 50,
      vegetationArea: 25,
      crops: ['Soy', 'Corn', 'Wheat'],
    });

    expect(producer).toBeDefined();
    expect(producer.crops).toContain('Soy');
    expect(producer.crops).toContain('Corn');
    expect(producer.crops).toContain('Wheat');
  });
});
