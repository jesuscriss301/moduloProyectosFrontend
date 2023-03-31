const URL_BASE = "http://sistemas:8080";

function carga() {
    const urltarea = new URLSearchParams(window.location.search);
    let tarea = urltarea.get('idTarea');
    const urlproyecto = new URLSearchParams(window.location.search);
    let proyecto = urlproyecto.get('nombreProyecto');

    let a= parseInt(tarea);
    b= parseInt(proyecto);
    if (!isNaN(a) && !isNaN(b)) {
        cargartareas(proyecto);
        info(a);
    }
}

async function info(id) {
    fetch(`${URL_BASE}/tareas/${id}`)
    .then(response => response.json())
    .then(data => tablaInfo(data))
    .catch(error => console.log(error));
}

async function tablaInfo(data) {
   
    const codigoProyecto =document.getElementById("codigoProyecto");
    const nombreProyecto =document.getElementById("nombreProyecto");
    const codigoTarea =document.getElementById("codigoTarea");
    const nombreTarea =document.getElementById("nombreTarea");
    const responsable =document.getElementById("responsable");
    const fechaInicio =document.getElementById("fechaInicio");
    const fechaFinal =document.getElementById("fechaFinal");

    codigoProyecto.textContent = data.idEtapaProyecto.idProyecto.id;
    nombreProyecto.textContent = data.idEtapaProyecto.idProyecto.nombreProyecto;
    codigoTarea.textContent = data.id;
    nombreTarea.textContent = data.nombreTarea;
    responsable.textContent = await getResponsablesTarea(data.id);
    fechaInicio.textContent = data.fechaInicioReal || data.fechaInicio;
    fechaFinal.textContent = data.fechaFinalReal || data.fechaFinal;
}

async function getResponsablesTarea(idTarea) {
    const response = await fetch(`${URL_BASE}/tareaPersonas/tareas/${idTarea}`);
    const data = await response.json();
    return data.map(item => item.id.idPersona).join(", ");
}

function cargartareas(proyecto) {
    fetch(`${URL_BASE}/tareas/${proyecto}/5`)
    .then(response => response.json())
    .then(data => cargarfiltro(data))
    .catch(error => console.log(error));
}

function cargarfiltro(data) {

    let tareaDropdown = document.querySelector("#tarea");
    tareaDropdown.innerHTML="";

    for (let i = 0; i < data.length; i++) {
    
        const newListItem = document.createElement("li");
        const element = data[i];
        // Create a new a element
        const newLink = document.createElement("button");
        newLink.setAttribute("class", "dropdown-item");
        newLink.setAttribute("onclick", "desplegable("+ element.id+",'"+ element.nombreTarea +"')");
        newLink.textContent = element.id+"- " +element.nombreTarea;
 
        // Append the newLink to the newListItem
        newListItem.appendChild(newLink); 
        tareaDropdown.appendChild(newListItem);
    }
}

function desplegable(id, nombre) {
    
    const proyectoDropdown = document.getElementById("SeleccionarTarea");
    proyectoDropdown.innerText=`${id} - ${nombre}`;

    var currentHostname = window.location.hostname;
    var currentPathname = window.location.pathname;
    var currentSearch = window.location.search;
    var currentHash = window.location.hash;

    const url = `${currentPathname}?nombreProyecto=${b}&idTarea=${id}`;
    // redirigir a la página con la URL construida
    window.location.href = url;

}
