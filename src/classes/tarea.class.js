
export class Tarea {

    static fromJson({id, descripcion, completado, creado}) {
        const tareaTemp = new Tarea(descripcion);
        tareaTemp.id        = id;
        tareaTemp.completado= completado;
        tareaTemp.creado    = creado;

        return tareaTemp;
    }

    constructor(tarea) {
        this.id         = new Date().getTime();
        this.descripcion= tarea;
        this.completado = false;
        this.creado     = new Date();
    }

}