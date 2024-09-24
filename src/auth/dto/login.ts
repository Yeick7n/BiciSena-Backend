/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Transform(({ value}) => value.trim())
    @IsNotEmpty()
    password: string;
}
