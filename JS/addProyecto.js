const URL_BASE = "http://sistemas:8080";

// Función para enviar una petición POST a la API y crear una nueva tarea
const crearProyecto = async (form) => {
  const nuevaTarea = {
    "idTipoProyecto":{"id":form[1]},
    "nombreProyecto":form[0],
    "descripcionProyecto":form[2],
    "idPrioridad":{"id":form[3]},
    "justificacion":form[4],
    "objetivoGeneral":form[5],
    "objetivoEspecifico":form[6],
    "ubicacion":form[7]
    };

  const response = await fetch(`${URL_BASE}/tareas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaTarea),
  });
  const data = await response.json();
  return data;
};

// Función para obtener los datos de una etapa de proyecto por su ID
const obtenerEtapaProyecto = async (form, proyecto) => {

  //buscar link para buscar etapa proyecto por la etapa ya el proyecto
  const response = await fetch(`${URL_BASE}/etapa_proyectos/${proyecto}/${form[1].value}`);
  const data = await response.json();
  return data;
};

// Función para asignar una persona responsable a una tarea
const asignarResponsable = async (nuevoProyecto, form) => {
  const responsable = {
    id: {
      idTarea: nuevoProyecto.id,
      idPersona:form[5].value,
    },
    fecha: nuevoProyecto.fechaInicio,
  };

  const response = await fetch(`${URL_BASE}/tareaPersonas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(responsable),
  });
  const data = await response.json();
  return data;
}

// Función principal que se encarga de crear una nueva tarea, asignar un responsable, y hacer alguna acción adicional
const addProyecto = async () => {
  const form = document.querySelector("#formProyecto");  

  const nuevaTarea = await crearProyecto(form);

  //const responsable = await asignarResponsable(nuevaTarea, form);

  location.href ="proyectos.html";
  
  // Hacer alguna acción adicional (por ejemplo, redireccionar a otra página)
};