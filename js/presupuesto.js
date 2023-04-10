const URL_BASE = "http://sistemas:8080";

function cargar() {
    const urlParams = new URLSearchParams(window.location.search);
    let queryParam = urlParams.get('nombreProyecto');
    if (queryParam != null && queryParam != "") {
        cargarProyecto(queryParam);
    }
}

async function cargarProyecto(id) {
    fetch(`${URL_BASE}/proyectos/${id}`)
        .then(response => response.json())
        .then(data => {
            tablaInfo(data);
            responsable(data.id);
        })
        .catch(error => console.log(error));
}

async function responsable(proyecto) {

    const responsable = document.getElementById("responsable");

    fetch(`${URL_BASE}/proyectoPersonas/proyecto/${proyecto}/3`)
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
    const tipo = document.getElementById("tipoProyecto");

    codigo.textContent = data.id;
    nombre.textContent = data.nombreProyecto;
    tipo.textContent = data.idTipoProyecto.nombre;

}

async function fila() {
    
    const tabla = document.getElementById(`tabla${idEtapa}`);
    const response = await fetch(`${URL_BASE}/tareas/${idProyecto}/${idEtapa}`);
    const data = await response.json();
    
    const boton = document.getElementById(`button${idEtapa}`);
    boton.disabled = (data.length === 0);
    boton.setAttribute("class", `accordion-button ${boton.disabled ? "collapsed" : ""} btn btn-outline-secondary`);
    
    for (const tarea of data) {

      const row = document.createElement("tr");
      
      row.setAttribute("data-id", tarea.id)
      row.addEventListener("dblclick", () => {
        const idTarea = row.getAttribute("data-id");
        window.location.href = `bitacora.html?nombreProyecto=${idProyecto}&idTarea=${idTarea}`;
      });
      let lastTouchTime = 0;
      const touchThreshold = 300; 
      row.addEventListener("touchstart",function() {
        const currentTime = new Date().getTime();
        const timeSinceLastTouch = currentTime - lastTouchTime;
      
        if (timeSinceLastTouch < touchThreshold) {
            const idTarea = row.getAttribute("data-id");
            window.location.href = `bitacora.html?nombreProyecto=${idProyecto}&idTarea=${idTarea}`;
          }
      
        lastTouchTime = currentTime;
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


