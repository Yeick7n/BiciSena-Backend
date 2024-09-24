/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Rol } from "src/rol/entities/rol.entity";

export class CreateUsuarioDto {

    @IsNotEmpty()
    nombre: string;

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    usuario: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    edad: number

    @IsNotEmpty()
    @IsNumber()
    estrato: number
    
    confirmToken: string;

    isConfirmed: boolean;

    isLogueado: boolean

    rol: Rol;
}
