/* eslint-disable prettier/prettier */

import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Bicicleta } from "src/bicicletas/entities/bicicleta.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";

export class CreateAlquilerDto {

    @IsNotEmpty()
    @IsDate()
    fecha_alquiler: Date
  
    @IsNotEmpty()
    @IsString()
    hora_inicio: string

    @IsNotEmpty()
    @IsString()
    hora_fin: string

    @IsNotEmpty()
    @IsNumber()
    costo_alquiler: number;

    @IsNotEmpty()
    @IsNumber()
    descuento: number;

    @IsNotEmpty()
    @IsNumber()
    Total_pagar: number;

    @IsNotEmpty()
    bicicleta: Bicicleta;

    @IsNotEmpty()
    usuario: Usuario

}
