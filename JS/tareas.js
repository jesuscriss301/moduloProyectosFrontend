function cargar() {
    const urlParams = new URLSearchParams(window.location.search);
    let queryParam = urlParams.get('nombreProyecto');
    console.log(queryParam);
    cargarProyectos();
    if (queryParam!=null && queryParam!="") {
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

    fetch(`http://sistemas:8080/proyectoPersonas/proyecto/${proyecto}/5`)
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

function agregartarea() {
  const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('nombreProyecto');
  if(queryParam==null||queryParam==""){
   alerta("Seleccione un proyecto para continuar")
  }else{
  location.href ="aggTarea.html?nombreProyecto="+queryParam;
  }
  
  function alerta(text) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const mensaje = document.getElementById('alerta');
    alertPlaceholder.setAttribute("class", "m-3");
    mensaje.innerText=text;
    setTimeout(function() {
      alertPlaceholder.setAttribute("class", "visually-hidden");
    }, 2500);
  }
  
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

async function etapas(idProyecto, idEtapa) {
    const tabla = document.getElementById(`tabla${idEtapa}`);
    const response = await fetch(`http://sistemas:8080/tareas/${idProyecto}/${idEtapa}`);
    const data = await response.json();
    
    const boton = document.getElementById(`button${idEtapa}`);
    boton.disabled = (data.length === 0);
    boton.setAttribute("class", `accordion-button ${boton.disabled ? "collapsed" : ""} btn btn-outline-secondary`);
    
    for (const tarea of data) {
      const row = document.createElement("tr");
      
      row.setAttribute("data-id", tarea.id)
      row.addEventListener("dblclick", () => {
        const idTarea = row.getAttribute("data-id");
        window.location.href = `bitacora.html?idTarea=${idTarea}`;
      });

      const cell1 = document.createElement("td");
      cell1.textContent = tarea.id;
      
      const cell2 = document.createElement("td");
      cell2.textContent = tarea.nombreTarea;
      
      const cell3 = document.createElement("td");
      cell3.textContent = await getResponsablesTarea(tarea.id);
      
      const cell4 = document.createElement("td");
      cell4.textContent = tarea.descripcionTarea;
      
      const cell5 = document.createElement("td");
      cell5.textContent = getFechasTarea(tarea);
      
      const cell6 = document.createElement("td");
      cell6.textContent = getEstadoTarea(tarea);
      
      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);
      row.appendChild(cell5);
      row.appendChild(cell6);
      
      tabla.appendChild(row);
    }
  }
  
  async function getResponsablesTarea(idTarea) {
    const response = await fetch(`http://sistemas:8080/tareaPersonas/tareas/${idTarea}`);
    const data = await response.json();
    return data.map(item => item.id.idPersona).join(", ");
  }
  
  function getFechasTarea(tarea) {
    const fechaInicio = tarea.fechaInicioReal || tarea.fechaInicio;
    const fechaFinal = tarea.fechaFinalReal || tarea.fechaFinal;
    return `${fechaInicio} / ${fechaFinal}`;
  }
  
  function getEstadoTarea(tarea) {
    if (tarea.fechaInicioReal === null) {
      return "en espera";
    } else if (tarea.fechaFinalReal === null) {
      return "en ejecución";
    } else {
      return "culminado";
    }
  }

