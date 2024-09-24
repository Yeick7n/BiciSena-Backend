import { Module } from '@nestjs/common';
import { BicicletasService } from './bicicletas.service';
import { BicicletasController } from './bicicletas.controller';

@Module({
  controllers: [BicicletasController],
  providers: [BicicletasService],
})
export class BicicletasModule {}
