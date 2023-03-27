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
        //newLink.setAttribute("onclick", "DiagramaGannt("+ element.id +")");
        newLink.textContent = element.nombreProyecto;
        
        // Append the newLink to the newListItem
        newListItem.appendChild(newLink); 
        proyectoDropdown.appendChild(newListItem);
      }
}

async function cargarProyectos() {
    
    fetch('http://sistemas:8080/proyectos/etapa/5')
    .then(response => response.json())
    .then(data => cargarfiltro(data))
    .catch(error => console.log(error));
}