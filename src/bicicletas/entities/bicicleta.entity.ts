/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bicicleta {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    precio_alquiler: number

    //COLOR
    //ESTADO
    //R
}