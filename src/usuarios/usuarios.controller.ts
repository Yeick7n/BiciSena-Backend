/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('crear')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get('obtenerTodos')
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get('obtener/:id')
  findOne(@Param('id') id: number) {
    return this.usuariosService.findOne(id);
  }

  @Patch('actualizar/:id')
  update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.updateUsuario(id, updateUsuarioDto);
  }

  @Delete('eliminar/:id')
  remove(@Param('id') id: number) {
    return this.usuariosService.remove(id);
  }
}
