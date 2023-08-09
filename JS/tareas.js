const URL_BASE = "http://192.168.1.211:8080";

function cargar() {
  const urlParams = new URLSearchParams(window.location.search);
  let queryParam = urlParams.get('nombreProyecto');
  cargarProyectos();
  if (queryParam != null && queryParam != "") {
    cargarProyecto(queryParam);
    tareasEtapa(queryParam);
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

  const response = await fetch(`${URL_BASE}/proyectos/responsable/${proyecto}`)
  const data = await  response.json();
  const nombres = await nombreResponsable(data,responsable);

  responsable.textContent = nombres;

}

function tablaInfo(data) {

  const codigo = document.getElementById("codigoProyecto");
  const nombre = document.getElementById("nombreProyecto");
  const tipo = document.getElementById("tipoProyecto");

  codigo.textContent = data.id;
  nombre.textContent = data.nombreProyecto;
  tipo.textContent = data.idTipoProyecto.nombre;

}

function cargarfiltro(data) {
  const proyectoDropdown = document.getElementById("proyectoEjecucion");
  proyectoDropdown.innerHTML = "";

  for (let i = 0; i < data.length; i++) {

    const newListItem = document.createElement("li");
    const element = data[i];
    // Create a new a element
    const newLink = document.createElement("button");
    newLink.setAttribute("class", "dropdown-item");
    newLink.setAttribute("onclick", "desplegable(" + element.id + ",'" + element.nombreProyecto + "')");
    newLink.textContent = element.id + "- " + element.nombreProyecto;

    // Append the newLink to the newListItem
    newListItem.appendChild(newLink);
    proyectoDropdown.appendChild(newListItem);

  }

}

function desplegable(id, nombre) {

  const proyectoDropdown = document.getElementById("proyectosButton");
  proyectoDropdown.innerText = `${id} - ${nombre}`;

  var currentHostname = window.location.hostname;
  var currentPathname = window.location.pathname;
  var currentSearch = window.location.search;
  var currentHash = window.location.hash;

  const url = `${currentPathname}?nombreProyecto=${id}`;
  // redirigir a la página con la URL construida
  window.location.href = url;

}

async function cargarProyectos() {

  fetch(`${URL_BASE}/proyectos/etapa/5`)
    .then(response => response.json())
    .then(data => cargarfiltro(data))
    .catch(error => console.log(error));
}

function tareasEtapa(idProyecto) {
  for (let i = 1; i <= 5; i++) {
    etapas(idProyecto, i);
  }
}

async function etapas(idProyecto, idEtapa) {
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
    row.addEventListener("touchstart", function () {
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

async function getResponsablesTarea(idTarea) {
  const response = await fetch(`${URL_BASE}/tareaPersonas/tareas/${idTarea}`);
  const data = await response.json();
  const arreglo = data.map(item => item.id.idPersona).join(", ");
  const nombres = await nombreResponsable(arreglo);
  return nombres;

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

async function actualizarform() {
  const urltarea = new URLSearchParams(window.location.search);
  let id = urltarea.get('nombreProyecto');
  const responsetarea = await fetch(`${URL_BASE}/proyectos/${id}`);
  const proyecto = await responsetarea.json();
  const form = document.getElementById("formProyecto");

  form[0].value = proyecto.nombreProyecto;
  form[1].value = proyecto.idTipoProyecto.id;
  form[2].value = proyecto.descripcionProyecto;
  form[3].value = proyecto.idPrioridad.id;
  form[4].value = proyecto.justificacion;
  form[5].value = proyecto.objetivoGeneral;
  form[6].value = proyecto.objetivoEspecifico;
  form[7].value = proyecto.ubicacion;

}

const actualizarProyecto = async () => {
  const urltarea = new URLSearchParams(window.location.search);
  let id = urltarea.get('nombreProyecto');
  const form = document.getElementById("formProyecto");

  const actualizar = {
    "id":parseInt(id),
    "idTipoProyecto":{"id":form[1].value},
    "nombreProyecto":form[0].value,
    "descripcionProyecto":form[2].value,
    "idPrioridad":{"id":form[3].value},
    "justificacion":form[4].value === "" ? null : form[4].value,
    "objetivoGeneral":form[5].value,
    "objetivoEspecifico":form[6].value === "" ? null : form[4].value,
    "ubicacion":form[7].value
    };

  const response = await fetch(`${URL_BASE}/proyectos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(actualizar),
  });
  const data = await response.json();
  location.reload();
  return data;
};
