import { Tarea } from "../classes";
import { listaTareas } from "../index";

// Referencias al HTML
const ulListaTareas = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const aFiltros      = document.querySelectorAll('.filtro');

export const crearTareaHtml = (tarea) => {
    const tareaHtml = `<li class="${ (tarea.completado) ? 'completed' : '' }" data-id="${tarea.id}">
						<div class="view">
							<input class="toggle" type="checkbox" ${ (tarea.completado) ? 'checked' : '' }>
							<label>${tarea.descripcion}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
                    </li>`;
                    
    const div = document.createElement('div');
    div.innerHTML = tareaHtml;

    ulListaTareas.append(div.firstElementChild);

    return div.firstElementChild;
}

txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const nuevaTarea = new Tarea(txtInput.value);
        listaTareas.nuevaTarea(nuevaTarea);

        crearTareaHtml(nuevaTarea);

        txtInput.value = '';
    }
});

ulListaTareas.addEventListener('click', (event) => {
    const tipoElemento = event.target.localName;
    const liTarea = event.target.parentElement.parentElement;
    const idTarea = liTarea.getAttribute('data-id');

    // Completar Tarea
    if (tipoElemento.includes('input')){ 
        listaTareas.completarTarea(idTarea);
        liTarea.classList.toggle('completed');

    //Eliminar Tarea
    } else if (tipoElemento.includes('button')) {
        listaTareas.eliminarTarea(idTarea);
        ulListaTareas.removeChild(liTarea);
    }

});


btnBorrar.addEventListener('click', () => {
    listaTareas.eliminarCompletados();

    for (let i = ulListaTareas.children.length - 1; i >= 0; i--) {
        const elemento = ulListaTareas.children[i];
        
        if (elemento.classList.contains('completed')) {
            ulListaTareas.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if (!filtro) { return; }

    aFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for (const elemento of ulListaTareas.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }    
            break;

            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
});