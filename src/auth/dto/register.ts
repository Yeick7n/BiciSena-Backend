/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { Regional } from 'src/regional/entities/regional.entity';
import { Rol } from 'src/rol/entities/rol.entity';

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(3)
  nombre: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @MinLength(6)
  usuario: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  edad: number;

  @IsNotEmpty()
  @IsNumber()
  estrato: number;

  @IsNotEmpty()
  rol: Rol;

  @IsNotEmpty()
  regional: Regional;

  // @IsNotEmpty()
  // ciclopaseos: Ciclopaseo[];

  @IsOptional()
  @IsString()
  confirmToken: string;

  @IsOptional()
  @IsBoolean()
  isConfirmed: boolean;

  @IsOptional()
  @IsBoolean()
  isLogueado: boolean;
}
