// CSS
import './css/styles.css';
// JS
import {Tarea, TareaList} from './classes';
import { crearTareaHtml } from './js/componentes';

export const listaTareas = new TareaList();

listaTareas.tareas.forEach(tarea => crearTareaHtml(tarea));

console.log(listaTareas);
