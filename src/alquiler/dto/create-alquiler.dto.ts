/* eslint-disable prettier/prettier */

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Bicicleta } from 'src/bicicletas/entities/bicicleta.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

export class CreateAlquilerDto {
  @IsNotEmpty()
  fecha_alquiler: Date;

  @IsNotEmpty()
  @IsString()
  hora_inicio: string;

  @IsOptional()
  @IsString()
  hora_fin: string;

  @IsNumber()
  @IsOptional()
  costo_alquiler: number;

  @IsNumber()
  @IsOptional()
  descuento: number;

  @IsNumber()
  @IsOptional()
  total_pagar: number;

  @IsNotEmpty()
  bicicleta: Bicicleta;

  @IsNotEmpty()
  usuario: Usuario;
}
