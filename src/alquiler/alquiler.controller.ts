/* eslint-disable prettier/prettier */
import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AlquilerService } from './alquiler.service';
import { Alquiler } from './entities/alquiler.entity';
import { CreateAlquilerDto } from './dto/create-alquiler.dto';
import { UpdateAlquilerDto } from './dto/update-alquiler.dto';

@Controller('alquiler')
export class AlquilerController {
  constructor(private readonly alquilerService: AlquilerService) {}

  @Post('crear')
  async crearAlquiler(@Param() idUsuario: number,
    @Body() createAlquilerDto: CreateAlquilerDto,
  ): Promise<Alquiler> {
    return this.alquilerService.crearAlquiler(createAlquilerDto, idUsuario);
  }
  // @UseGuards(AuthGuard())
  // @Post()
  // async crearAlquiler(@Body() createAlquilerDto: CreateAlquilerDto, @Req() request: Request): Promise<Alquiler> {
  //   const usuarioId = request.user.id; // Obtener el ID del usuario logueado desde el request
  //   return await this.alquilerService.crearAlquiler(createAlquilerDto, usuarioId);
  // }

  @Patch('devolver/:id')
  async devolverBicicleta(
    @Param('id') alquilerId: number,
    @Body('hora_fin') horaFin: string,
  ): Promise<Alquiler> {
    return this.alquilerService.devolverlaBicicleta(alquilerId, horaFin);
  }

  @Patch(':id')
  async editarAlquiler(@Param('id') id: number, @Body() updateAlquilerDto: UpdateAlquilerDto): Promise<Alquiler> {
    return this.alquilerService.editarAlquiler(id, updateAlquilerDto);
  }
}
