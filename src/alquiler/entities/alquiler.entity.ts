/* eslint-disable prettier/prettier */
import { Bicicleta } from 'src/bicicletas/entities/bicicleta.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Alquiler {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha_alquiler: Date

  @Column()
  hora_inicio: string;

  @Column({ nullable: true })
  hora_fin: string;

  @Column({ nullable: true, type: 'float' })
  costo_alquiler: number;

  @Column({ nullable: true, type: 'float' })
  descuento: number;

  @Column({ nullable: true, type: 'float' })
  total_pagar: number;

  @ManyToOne(() => Bicicleta, (bicicleta) => bicicleta.alquileres)
  bicicleta: Bicicleta

  @ManyToOne(() => Usuario, (usuario) => usuario.alquileres)
  usuario: Usuario

}
