import { Tarea } from "./tarea.class";


export class TareaList {

    constructor() {        
        this.cargarLocalStorage();
    }

    nuevaTarea(tarea) {
        this.tareas.push(tarea);
        this.guardarLocalStorage();
    }

    eliminarTarea(id) {
        this.tareas = this.tareas.filter(tarea => tarea.id != id);
        this.guardarLocalStorage();
    }

    completarTarea(id) {
        for (const tarea of this.tareas) {
            if(tarea.id == id) { 
                tarea.completado = !tarea.completado;
                break;
            }
        }
        this.guardarLocalStorage();
    }

    eliminarCompletados() {
        this.tareas = this.tareas.filter(tarea => !tarea.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }

    cargarLocalStorage(){
        this.tareas = (localStorage.getItem('tareas')) ? JSON.parse(localStorage.getItem('tareas')) : [];
        // Convierte los objetos a instancias de la clase Tarea
        this.tareas = this.tareas.map( obj => Tarea.fromJson(obj) );
    }
}