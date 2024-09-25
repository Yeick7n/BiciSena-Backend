/* eslint-disable prettier/prettier */
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ciclopaseo {
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column()
  ubicacion: string;

  @ManyToMany(() => Usuario, (usuario) => usuario.ciclopaseos)
  usuarios: Usuario[]
}
