/* eslint-disable prettier/prettier */
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Alquiler {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hora_salida: Date;

  @Column()
  hora_entrega: Date;

  @Column()
  valor: number;

  @Column()
  tarifa_adicional: number;

  @ManyToMany(() => Usuario, (usuario) => usuario.alquileres, {
    cascade: true,
  })
  @JoinTable({
    name: 'usuarios_alquiler',
    joinColumn: {
      name: 'alquiler_id',
    },
    inverseJoinColumn: {
      name: 'usuarios_id',
    },
  })
  usuarios: Usuario[]
}
