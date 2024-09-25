/* eslint-disable prettier/prettier */
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

export class CreateCiclopaseoDto {
  @IsNotEmpty()
  @IsDateString()
  fecha: Date;

  @IsNotEmpty()
  @IsString()
  ubicacion: string;

  @IsOptional()
  usuarios: Usuario[];
}
