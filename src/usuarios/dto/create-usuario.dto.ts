/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
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

    confirmToken: string;

    isConfirmed: boolean;

    isLogueado: boolean

    rol: Rol;
}
