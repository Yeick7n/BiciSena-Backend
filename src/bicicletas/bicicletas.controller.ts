/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BicicletasService } from './bicicletas.service';
import { CreateBicicletaDto } from './dto/create-bicicleta.dto';
import { UpdateBicicletaDto } from './dto/update-bicicleta.dto';

@Controller('bicicletas')
export class BicicletasController {
  constructor(private readonly bicicletasService: BicicletasService) {}

  @Post('crear')
  create(@Body() createBicicletaDto: CreateBicicletaDto) {
    return this.bicicletasService.create(createBicicletaDto);
  }

  @Get('obtenerTodos')
  findAll() {
    return this.bicicletasService.findAll();
  }

  @Get('obtener/:id')
  findOne(@Param('id') id: number) {
    return this.bicicletasService.findOne(id);
  }

  @Patch('actualizar/:id')
  update(@Param('id') id: number, @Body() updateBicicletaDto: UpdateBicicletaDto) {
    return this.bicicletasService.update(id, updateBicicletaDto);
  }

  @Delete('eliminar/:id')
  remove(@Param('id') id: number) {
    return this.bicicletasService.remove(id);
  }

  @Get('obtenerPorRegional/:id')
  findBiciByRegional(@Param('id') id: number) {
    return this.bicicletasService.findBiciByRegional(id);
  }

}
