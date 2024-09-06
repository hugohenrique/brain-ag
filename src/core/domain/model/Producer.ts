import { Table, Column, Model, DataType } from 'sequelize-typescript';

export interface ProducerAttributes {
  id?: number;
  cpfCnpj: string;
  name: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  agriculturalArea: number;
  vegetationArea: number;
  crops: string[];
}

export interface ProducerCreationAttributes extends Omit<ProducerAttributes, 'id'> {}

@Table({
  tableName: 'producers',
  timestamps: false,
})
export class Producer extends Model<ProducerAttributes, ProducerCreationAttributes> 
  implements ProducerAttributes {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isValidCpfCnpj(value: string) {
        if (!value || value.length < 11 || value.length > 14) {
          throw new Error('CPF/CNPJ inválido.');
        }
      },
    },
  })
  public cpfCnpj!: ProducerAttributes['cpfCnpj'];

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public farmName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public city!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public state!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  public totalArea!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: {
      isValidArea(this: Producer) {
        if (this.agriculturalArea + this.vegetationArea > this.totalArea) {
          throw new Error('Soma de área agricultável e vegetação não pode ser maior que a área total.');
        }
      },
    },
  })
  public agriculturalArea!: ProducerAttributes['agriculturalArea'];

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  public vegetationArea!: number;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  public crops!: string[];
}
