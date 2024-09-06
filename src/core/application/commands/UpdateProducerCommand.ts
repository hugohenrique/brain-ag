import { Producer } from '../../domain/model/Producer';

export default class UpdateProducerCommand {
  id: string;
  cpfCnpj?: string;
  name?: string;
  farmName?: string;
  city?: string;
  state?: string;
  totalArea?: number;
  agriculturalArea?: number;
  vegetationArea?: number;
  crops?: string[];

  constructor(id: string, data: Partial<Producer>) {
    this.id = id;
    this.cpfCnpj = data.cpfCnpj;
    this.name = data.name;
    this.farmName = data.farmName;
    this.city = data.city;
    this.state = data.state;
    this.totalArea = data.totalArea;
    this.agriculturalArea = data.agriculturalArea;
    this.vegetationArea = data.vegetationArea;
    this.crops = data.crops;
  }
}
