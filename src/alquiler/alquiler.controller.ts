/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlquilerService } from './alquiler.service';
import { CreateAlquilerDto } from './dto/create-alquiler.dto';
import { UpdateAlquilerDto } from './dto/update-alquiler.dto';

@Controller('alquiler')
export class AlquilerController {
  constructor(private readonly alquilerService: AlquilerService) {}

  @Post('crear')
  create(@Body() createAlquilerDto: CreateAlquilerDto) {
    return this.alquilerService.create(createAlquilerDto);
  }

  @Get('obtenerTodos')
  findAll() {
    return this.alquilerService.findAll();
  }

  @Get('obtener/:id')
  findOne(@Param('id') id: number) {
    return this.alquilerService.findOne(id);
  }

  @Patch('actualizar/:id')
  update(@Param('id') id: number, @Body() updateAlquilerDto: UpdateAlquilerDto) {
    return this.alquilerService.update(id, updateAlquilerDto);
  }

  @Delete('eliminar/:id')
  remove(@Param('id') id: number) {
    return this.alquilerService.remove(id);
  }
}
