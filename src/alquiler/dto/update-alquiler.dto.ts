/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateAlquilerDto {
  @IsOptional()
  @IsDateString()
  fecha_alquiler?: Date;

  @IsOptional()
  @IsString()
  hora_inicio?: string;

  @IsOptional()
  bicicletaId?: number;  
}
