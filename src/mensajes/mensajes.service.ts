import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { Mensaje } from './entities/mensaje.entity';

@Injectable()
export class MensajesService {
  constructor(
    @InjectRepository(Mensaje)
    private mensajeRepository: Repository<Mensaje>,
  ) {}

  // lista de notas
  async getAll(): Promise<Mensaje[]> {
    return await this.mensajeRepository.find();
  }

  async createMensaje(mensajeNuevo: CreateMensajeDto): Promise<Mensaje> {
    const nuevo = new Mensaje();
    nuevo.mensaje = mensajeNuevo.mensaje;
    nuevo.nick = mensajeNuevo.nick;
    // guardamos el mensaje el la BD
    return await this.mensajeRepository.save(nuevo);
  }

  async updateMensaje(
    idMensaje: number,
    mensajeActualizar: CreateMensajeDto,
  ): Promise<Mensaje> {
    const mensajeUpdate = await this.mensajeRepository.findOne(idMensaje);
    // Iremos actualizar el mensaje
    mensajeUpdate.mensaje = mensajeActualizar.mensaje;
    mensajeUpdate.nick = mensajeActualizar.nick;

    return await this.mensajeRepository.save(mensajeUpdate);
  }

  async deleteMensaje(idMensaje: number): Promise<any> {
    return await this.mensajeRepository.delete(idMensaje);
  }
}
