function cargar() {
    
    cargarProyectos();
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
    
  }


async function cargarProyectos() {
    
    fetch('http://sistemas:8080/proyectos/etapa/5')
    .then(response => response.json())
    .then(data => cargarfiltro(data))
    .catch(error => console.log(error));
}