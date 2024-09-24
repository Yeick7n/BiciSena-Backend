/* eslint-disable prettier/prettier */

import { Rol } from "src/rol/entities/rol.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    usuario: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    confirmToken: string;

    @Column({ default: false })
    isConfirmed: boolean;

    @Column({ default: false })
    isLogueado: boolean

    @ManyToOne(() => Rol, (rol) => rol.usuarios,{ eager: true })
    rol: Rol;

}
