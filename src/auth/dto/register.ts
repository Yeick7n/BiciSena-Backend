/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, MinLength } from "class-validator";
import { Rol } from "src/rol/entities/rol.entity";

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

    rol: Rol;

    confirmToken: string;

    isConfirmed: boolean;

    isLogueado: boolean

    
}
