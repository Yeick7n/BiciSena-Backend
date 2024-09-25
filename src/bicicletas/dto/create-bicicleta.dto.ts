/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Marca } from 'src/marcas/entities/marca.entity';
import { Regional } from 'src/regional/entities/regional.entity';

export class CreateBicicletaDto {
  @IsNotEmpty()
  @IsNumber()
  precio_alquiler: number;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  marca: Marca;

  @IsNotEmpty()
  estado: string;

  @IsNotEmpty()
  regional: Regional
}
