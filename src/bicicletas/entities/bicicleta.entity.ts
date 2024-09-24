/* eslint-disable prettier/prettier */
import { Marca } from 'src/marcas/entities/marca.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bicicleta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  precio_alquiler: number;

  @Column()
  color: string;

  @ManyToOne(() => Marca, (marca) => marca.bicicletas)
  marca: Marca
}
