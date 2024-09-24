/* eslint-disable prettier/prettier */
import { Bicicleta } from "src/bicicletas/entities/bicicleta.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Marca {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(() => Bicicleta, (bicicleta) => bicicleta.marca)
    bicicletas: Bicicleta[]

}