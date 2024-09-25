/* eslint-disable prettier/prettier */
import { Alquiler } from 'src/alquiler/entities/alquiler.entity';
import { Marca } from 'src/marcas/entities/marca.entity';
import { Regional } from 'src/regional/entities/regional.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bicicleta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  precio_alquiler: number;

  @Column()
  color: string;
  
  @Column()
  estado: string
  
  @ManyToOne(() => Marca, (marca) => marca.bicicletas)
  marca: Marca

  @ManyToOne(() => Regional, (regional) => regional.bicicletas)
  regional: Regional

  @OneToMany(() => Alquiler, (alquiler) => alquiler.bicicleta)
  alquileres: Alquiler[]

}
