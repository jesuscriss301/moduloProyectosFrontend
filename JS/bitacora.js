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
        cargartareas(a);
    }
}

async function cargartareas(id) {
    fetch(`${URL_BASE}/tareas/${id}`)
    .then(response => response.json())
    .then(data => tablaInfo(data))
    .catch(error => console.log(error));
}

function tablaInfo(data) {
    
    const codigoProyecto =document.getElementById("codigoProyecto");
    const nombreProyecto =document.getElementById("nombreProyecto");
    const codigoTarea =document.getElementById("codigoTarea");
    const nombreTarea =document.getElementById("nombreTarea");
    
    
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
    console.log(data);

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
