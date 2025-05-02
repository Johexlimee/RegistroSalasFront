import { Programa } from './programa.modelo';
import { Promocion } from './promocion.modelo';
import { Sala } from './sala.modelo';
//import { Usuario } from './usuario.model';

export class ControlSala {
  id_registro: number; // ID del registro
  codigo_bocero1: string; // Código del primer bocero
  codigo_bocero2: string; // Código del segundo bocero
  descripcion: string; // Descripción del registro
  descripcion_dos: string; // Segunda descripción
  fecha: Date; // Fecha del registro
  hora_entrada: string; // Hora de entrada (formato HH:mm:ss)
  hora_salida: string; // Hora de salida (formato HH:mm:ss)
  programa: Programa; // Relación con Programa
  promocion: Promocion; // Relación con Promoción
  sala: Sala; // Relación con Sala
 // usuario: Usuario; // Relación con Usuario
  nombre_bocero1: string; // Nombre del primer vocero
  nombre_bocero2: string; // Nombre del segundo vocero

  constructor(
    id_registro: number,
    codigo_bocero1: string,
    codigo_bocero2: string,
    descripcion: string,
    descripcion_dos: string,
    fecha: Date,
    hora_entrada: string,
    hora_salida: string,
    programa: Programa,
    promocion: Promocion,
    sala: Sala,
   // usuario: Usuario,
    nombre_bocero1: string,
    nombre_bocero2: string
  ) {
    this.id_registro = id_registro;
    this.codigo_bocero1 = codigo_bocero1;
    this.codigo_bocero2 = codigo_bocero2;
    this.descripcion = descripcion;
    this.descripcion_dos = descripcion_dos;
    this.fecha = fecha;
    this.hora_entrada = hora_entrada;
    this.hora_salida = hora_salida;
    this.programa = programa;
    this.promocion = promocion;
    this.sala = sala;
   // this.usuario = usuario;
    this.nombre_bocero1 = nombre_bocero1;
    this.nombre_bocero2 = nombre_bocero2;
  }
}
