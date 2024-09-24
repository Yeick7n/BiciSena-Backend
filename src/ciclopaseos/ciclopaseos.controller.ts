/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CiclopaseosService } from './ciclopaseos.service';
import { CreateCiclopaseoDto } from './dto/create-ciclopaseo.dto';
import { UpdateCiclopaseoDto } from './dto/update-ciclopaseo.dto';

@Controller('ciclopaseos')
export class CiclopaseosController {
  constructor(private readonly ciclopaseosService: CiclopaseosService) {}

  @Post('crear')
  create(@Body() createCiclopaseoDto: CreateCiclopaseoDto) {
    return this.ciclopaseosService.create(createCiclopaseoDto);
  }

  @Get('obtenerTodos')
  findAll() {
    return this.ciclopaseosService.findAll();
  }

  @Get('obtener/:id')
  findOne(@Param('id') id: number) {
    return this.ciclopaseosService.findOne(id);
  }

  @Patch('actualizar/:id')
  update(@Param('id') id: number, @Body() updateCiclopaseoDto: UpdateCiclopaseoDto) {
    return this.ciclopaseosService.update(id, updateCiclopaseoDto);
  }

  @Delete('eliminar/:id')
  remove(@Param('id') id: number) {
    return this.ciclopaseosService.remove(id);
  }
}
