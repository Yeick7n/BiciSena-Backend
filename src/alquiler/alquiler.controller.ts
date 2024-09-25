/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
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

  // GANANCIAS

  @Get('ganancias-totales-por-regional')
  async obtenerGananciasTotalesPorRegional(
    @Query('regional') regional: string,
  ): Promise<number> {
    return await this.alquilerService.calcularGananciasTotalesPorRegional(regional);
  }

  // Endpoint para obtener las ganancias por mes y regional
  @Get('ganancias-por-mes-por-regional')
  async obtenerGananciasPorMesPorRegional(
    @Query('mes') mes: number,
    @Query('año') año: number,
    @Query('regional') regional: string,
  ): Promise<number> {
    return await this.alquilerService.calcularGananciasPorMesPorRegional(mes, año, regional);
  }


  // ganancias generales


  @Get('ganancias-totales')
  async obtenerGananciasTotales(): Promise<number> {
    return await this.alquilerService.calcularGananciasTotales();
  }

  // Endpoint para obtener las ganancias por mes
  @Get('ganancias-por-mes')
  async obtenerGananciasPorMes(
    @Query('mes') mes: number,
    @Query('año') año: number,
  ): Promise<number> {
    return await this.alquilerService.calcularGananciasPorMes(mes, año);
  }
  
}
