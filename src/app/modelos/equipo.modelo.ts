export class Equipo {
  idEquipo: number;
  estadoEquipo: boolean;
  sala: { idSala: number; nombre: string };
  serial: string;
  tipoEquipo: { idTipoEquipo: number; nombre: string };

  constructor(
    idEquipo: number,
    estadoEquipo: boolean,
    sala: { idSala: number; nombre: string },
    serial: string,
    tipoEquipo: { idTipoEquipo: number; nombre: string }
  ) {
    this.idEquipo = idEquipo;
    this.estadoEquipo = estadoEquipo;
    this.sala = sala;
    this.serial = serial;
    this.tipoEquipo = tipoEquipo;
  }
}
