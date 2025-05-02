export class Novedad {
    id_novedad: number;
    descripcion: string;
    id_equipo: number;
    id_tipo_novedad: number;
  
    constructor(id_novedad: number, descripcion: string, id_equipo: number, id_tipo_novedad: number) {
      this.id_novedad = id_novedad;
      this.descripcion = descripcion;
      this.id_equipo = id_equipo;
      this.id_tipo_novedad = id_tipo_novedad;
    }
  }
  
