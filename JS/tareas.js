function cargar() {
    const urlParams = new URLSearchParams(window.location.search);
    queryParam = urlParams.get('nombreProyecto');
    cargarProyecto(queryParam);
    cargarProyectos();
}

async function cargarProyecto(id) {
    fetch(`http://sistemas:8080/proyectos/${id}`)
    .then(response => response.json())
    .then(data => {
        tablaInfo(data);
        responsable(data.id);
    })
    .catch(error => console.log(error));
}
async function responsable(proyecto) {
        
    const responsable = document.getElementById("responsable");

    fetch(`http://localhost:8080/proyectoPersonas/proyecto/${proyecto}/5`)
    .then(response => response.json())
    .then(data => {
        responsable.textContent=data[0].id.persona;
    })
    .catch(error => console.log(error));
}

function tablaInfo(data) {
    
    const codigo = document.getElementById("codigoProyecto");
    const nombre = document.getElementById("nombreProyecto");
    const tipo= document.getElementById("tipoProyecto");
    

    codigo.textContent=data.id;
    nombre.textContent=data.nombreProyecto;
    tipo.textContent=data.idTipoProyecto.nombre;

}


function cargarfiltro(data) {
    const proyectoDropdown = document.getElementById("proyectoEjecucion");
    proyectoDropdown.innerHTML="";
    
    for (let i = 0; i < data.length; i++) {
    
        const newListItem = document.createElement("li");
        const element = data[i];
        // Create a new a element
        const newLink = document.createElement("button");
        newLink.setAttribute("class", "dropdown-item");
        newLink.setAttribute("onclick", "desplegable("+ element.id+",'"+ element.nombreProyecto +"')");
        newLink.textContent = element.id+"- " +element.nombreProyecto;
 
        // Append the newLink to the newListItem
        newListItem.appendChild(newLink); 
        proyectoDropdown.appendChild(newListItem);
    }
      
}

function desplegable(id, nombre) {

    const proyectoDropdown = document.getElementById("proyectosButton");
    proyectoDropdown.innerText=`${id} - ${nombre}`;

    var currentHostname = window.location.hostname;
    var currentPathname = window.location.pathname;
    var currentSearch = window.location.search;
    var currentHash = window.location.hash;

    const url = `${currentPathname}?nombreProyecto=${id}`;
    // redirigir a la página con la URL construida
    window.location.href = url;

    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('nombreProyecto');
    
  }

async function cargarProyectos() {
    
    fetch('http://sistemas:8080/proyectos/etapa/5')
    .then(response => response.json())
    .then(data => cargarfiltro(data))
    .catch(error => console.log(error));
}