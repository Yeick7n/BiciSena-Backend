/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
// import { CreateAlquilerDto } from './dto/create-alquiler.dto';
// import { UpdateAlquilerDto } from './dto/update-alquiler.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Alquiler } from './entities/alquiler.entity';
import { Repository } from 'typeorm';
import { Bicicleta } from 'src/bicicletas/entities/bicicleta.entity';
import { CreateAlquilerDto } from './dto/create-alquiler.dto';

@Injectable()
export class AlquilerService {
  private readonly tarifaPorHora = 1000; // Tarifa fija de 1000 pesos por hora

  constructor(
    @InjectRepository(Alquiler) private alquilerRepository: Repository<Alquiler>,
    @InjectRepository(Bicicleta) private bicicletaRepository: Repository<Bicicleta>,

  ) {}

  async crearAlquiler(alquiler: CreateAlquilerDto): Promise<Alquiler> {

    const { bicicleta } = alquiler

    if(bicicleta.estado !== 'Disponible'){
      throw new ConflictException('La bicicleta no está disponible')
    }

    const newAlquiler = await this.alquilerRepository.create(alquiler)
    
    bicicleta.estado = 'Alquilada'

    await this.bicicletaRepository.save(bicicleta)

    return await this.alquilerRepository.save(newAlquiler)
  }

  async devolverBicicleta(){
    
  }

  async devolverlaBicicleta(alquilerId: number, horaFin: string): Promise<Alquiler> {
    const alquiler = await this.alquilerRepository.findOne({
      where: { id: alquilerId },
      relations: ['bicicleta', 'usuario'],
    });

    if (!alquiler) {
      throw new NotFoundException('Alquiler no encontrado');
    }

    const tiempoUso = this.calcularTiempoUso(alquiler.hora_inicio, horaFin);
    const costoAlquiler = tiempoUso * this.tarifaPorHora;

   // Descuento
    const descuento = this.calcularDescuento(alquiler.usuario.estrato, costoAlquiler);
    const totalAPagar = costoAlquiler - descuento;

    alquiler.hora_fin = horaFin;
    alquiler.costo_alquiler = costoAlquiler;
    alquiler.descuento = descuento;
    alquiler.total_pagar = totalAPagar;

    alquiler.bicicleta.estado = 'Disponible';
    await this.bicicletaRepository.save(alquiler.bicicleta);

    return await this.alquilerRepository.save(alquiler);
  }

  private calcularTiempoUso(horaInicio: string, horaFin: string): number {
    const [horasInicio, minutosInicio] = horaInicio.split(':').map(Number);
    const [horasFin, minutosFin] = horaFin.split(':').map(Number);

    const inicio = new Date();
    inicio.setHours(horasInicio, minutosInicio);

    const fin = new Date();
    fin.setHours(horasFin, minutosFin);

    const diferencia = (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60); // Convertir de milisegundos a horas

    return diferencia;
  }

  private calcularDescuento(estrato: number, costo: number): number {
    let porcentajeDescuento = 0;
    if (estrato === 1 || estrato === 2) {
      porcentajeDescuento = 0.1; // 10%
    } else if (estrato === 3 || estrato === 4) {
      porcentajeDescuento = 0.05; // 5%
    }
    return costo * porcentajeDescuento;
  }
}
