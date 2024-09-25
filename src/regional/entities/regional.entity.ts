/* eslint-disable prettier/prettier */
import { Bicicleta } from 'src/bicicletas/entities/bicicleta.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Regional {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  municipio: string;

  @Column()
  departamento: string;

  @OneToMany(() => Usuario, (usuario) => usuario.regional)
  usuarios: Usuario[]

  @OneToMany(() => Bicicleta, (bicicleta) => bicicleta.regional)
  bicicletas: Bicicleta[]
}
