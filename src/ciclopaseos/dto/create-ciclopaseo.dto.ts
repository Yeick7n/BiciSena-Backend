/* eslint-disable prettier/prettier */
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateCiclopaseoDto {

    @IsNotEmpty()
    @IsDateString()
    fecha: Date

    @IsNotEmpty()
    @IsString()
    ubicación: string;
}
