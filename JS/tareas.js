function cargar() {
    const urlParams = new URLSearchParams(window.location.search);
    let queryParam = urlParams.get('nombreProyecto');
    cargarProyectos();
    if (queryParam!=null) {
    cargarProyecto(queryParam);
    tareasEtapa(queryParam);
    }
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
        const idPersonas = data.map(item => item.id.persona);
        const rta = idPersonas.join(", ");
        responsable.textContent = rta;
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

function tareasEtapa(idProyecto) {

    //console.log(idProyecto);
    for(let i =1; i<=5;i++){
        
        etapas(idProyecto,i);
    }
}

async function etapas(ididProyecto,idEtapa) {

    const tabla = document.getElementById(`tabla${idEtapa}`);
    fetch(`http://sistemas:8080/tareas/${ididProyecto}/${idEtapa}`)
    .then(response => response.json())
    .then(async data => {
        let boton = document.getElementById(`button${idEtapa}`);
        if(data.length==0){
            boton.setAttribute("class","accordion-button collapsed btn btn-outline-secondary" );
        }else{
            boton.disabled=false;

        for(var i in data){
        const row1 = document.createElement("tr");
        const cell1 = document.createElement("td");
        const cell2 = document.createElement("td");
        const cell3 = document.createElement("td");
        const cell4 = document.createElement("td");
        const cell5 = document.createElement("td");
        const cell6 = document.createElement("td");

        cell1.textContent = data[i].id;
        cell2.textContent = data[i].nombreTarea;
        responsabletarea(data[i].id);
        cell4.textContent = data[i].descripcionTarea;
        var fechaFinal = data[i].fechaFinal;
        var fechainicial = data[i].fechaFinal;
        if (data[i].fechaInicioReal == null) {
          fechainicial= data[i].fechaInicio;
          fechaFinal= data[i].fechaFinal;
          cell6.textContent = "en espera";
        } else {if (data[i].fechaFinalReal == null) {
            fechainicial = data[i].fechaInicioReal;
            fechaFinal = data[i].fechaFinal;
            cell6.textContent = "culminado";
          }else{
            fechainicial = data[i].fechaInicioReal;
            fechaFinal = data[i].fechaFinalReal;
            cell6.textContent = "en ejecución";
          }
        }
        if (fechainicial < fechaFinal) {
          cell5.textContent = fechainicial +" / "+ fechaFinal ;
        }else{
         cell5.textContent = fechainicial +" / "+ fechaFinal ;
        }
    async function responsabletarea(idTarea) {
    
        fetch('http://localhost:8080/tareaPersonas/tareas/'+idTarea)
            .then(response => response.json())
            .then(rta => {
                cell3.textContent = rta.map(item => item.id.idPersona).join(" ,");
            })
            .catch(error => console.log(error));
        }

        row1.appendChild(cell1);
        row1.appendChild(cell2);
        row1.appendChild(cell3);
        row1.appendChild(cell4);
        row1.appendChild(cell5);
        row1.appendChild(cell6);

        tabla.appendChild(row1)
        }
    }
    })
    .catch(error => console.log(error));
}

