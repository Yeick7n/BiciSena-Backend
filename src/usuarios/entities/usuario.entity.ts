/* eslint-disable prettier/prettier */

import { Alquiler } from "src/alquiler/entities/alquiler.entity";
import { Ciclopaseo } from "src/ciclopaseos/entities/ciclopaseo.entity";
import { Rol } from "src/rol/entities/rol.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    edad: number;

    @Column()
    estrato: number;


    @ManyToOne(() => Rol, (rol) => rol.usuarios,{ eager: true })
    rol: Rol;
    
    @ManyToMany(() => Ciclopaseo, (ciclopaseo) => ciclopaseo.usuarios, {
        cascade: true
    })
    @JoinTable({
        name: 'ciclopaseo_usuario',
        joinColumn: {
            name: 'usuario_id'
        },
        inverseJoinColumn: {
            name: 'ciclopaseo_id'
        },
    })
    ciclopaseos: Ciclopaseo[]

    @ManyToMany(() => Alquiler, (alquiler) => alquiler.usuarios)
    alquileres: Alquiler[]

}
