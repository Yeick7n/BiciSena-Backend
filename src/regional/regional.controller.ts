/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegionalService } from './regional.service';
import { CreateRegionalDto } from './dto/create-regional.dto';
import { UpdateRegionalDto } from './dto/update-regional.dto';
// import { AuthGuard } from 'src/guards/auth.guard';

// @UseGuards(AuthGuard)
@Controller('regional')
export class RegionalController {
  constructor(private readonly regionalService: RegionalService) {}

  @Post('crear')
  create(@Body() createRegionalDto: CreateRegionalDto) {
    return this.regionalService.create(createRegionalDto);
  }

  @Get('obtenerTodos')
  findAll() {
    return this.regionalService.findAll();
  }

  @Get('obtener/:id')
  findOne(@Param('id') id: number) {
    return this.regionalService.findOne(id);
  }

  @Patch('actualizar/:id')
  update(@Param('id') id: number, @Body() updateRegionalDto: UpdateRegionalDto) {
    return this.regionalService.update(id, updateRegionalDto);
  }

  @Delete('eliminar/:id')
  remove(@Param('id') id: number) {
    return this.regionalService.remove(id);
  }
}
