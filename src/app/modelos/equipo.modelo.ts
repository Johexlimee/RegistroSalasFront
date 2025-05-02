export class Equipo {
  idEquipo: number;
  estado: string;
  sala: { idSala: number; nombre: string };
  serial: string;
  tipoEquipo: { idTipoEquipo: number; nombre: string };

  constructor(
    idEquipo: number,
    estado: string,
    sala: { idSala: number; nombre: string },
    serial: string,
    tipoEquipo: { idTipoEquipo: number; nombre: string }
  ) {
    this.idEquipo = idEquipo;
    this.estado = estado;
    this.sala = sala;
    this.serial = serial;
    this.tipoEquipo = tipoEquipo;
  }
}
