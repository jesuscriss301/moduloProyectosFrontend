const URL_BASE = "http://sistemas:8080";

// Función para enviar una petición POST a la API y crear una nueva tarea
const crearTarea = async (idEtapaProyecto, form) => {
  const nuevaTarea = {
    idEtapaProyecto: { id: idEtapaProyecto },
    nombreTarea: form[0].value,
    descripcionTarea: form[2].value,
    fechaInicio: form[3].value,
    fechaFinal: form[4].value,
    fechaInicioReal: null,
    fechaFinalReal: null,
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
const obtenerEtapaProyecto = async () => {

  const urlParams = new URLSearchParams(window.location.search);
    let queryParam = urlParams.get('nombreProyecto'); 
  //buscar link para buscar etapa proyecto por la etapa ya el proyecto

  const response = await fetch(`${URL_BASE}/etapa_proyectos/${idEtapaProyecto}`);
  const data = await response.json();
  return data;
};

// Función para asignar una persona responsable a una tarea
const asignarResponsable = async (nuevaTarea, form) => {
  const responsable = {
    id: {
      idTarea: nuevaTarea.id,
      idPersona: parseInt(form[5].value, 10),
    },
    fecha: nuevaTarea.fechaInicio,
  };
  console.log(responsable);

  const response = await fetch(`${URL_BASE}/tareaPersonas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(responsable),
  });
  const data = await response.json();
  return data;
};

const despliegue = async (number)=>{
  desplegarEtapa(number);

}

// Función principal que se encarga de crear una nueva tarea, asignar un responsable, y hacer alguna acción adicional
const addTarea = async () => {
  const form = document.querySelector("#formTarea");
  //console.log(form[0].value);

  const etapaProyecto = await obtenerEtapaProyecto();
  console.log(etapaProyecto);

  const nuevaTarea = await crearTarea(etapaProyecto, form);
  console.log(nuevaTarea);

  const responsable = await asignarResponsable(nuevaTarea, form);
  console.log(responsable);

  location.href ="tareas.html?nombreProyecto="+etapaProyecto.idProyecto.id;

  // Hacer alguna acción adicional (por ejemplo, redireccionar a otra página)
};