const URL_BASE = "http://192.168.1.211:8080";

// Función para enviar una petición POST a la API y crear una nueva tarea
const crearTarea = async (idEtapaProyecto, form) => {
  const nuevaTarea = {
    idEtapaProyecto: { id: idEtapaProyecto.id },
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
const obtenerEtapaProyecto = async (form, proyecto) => {

  const response = await fetch(`${URL_BASE}/etapa_proyectos/${proyecto}/${form[1].value}`);
  
  //buscar link para buscar etapa proyecto por la etapa ya el proyecto
  const data = await response.json();
  if (data==null) {
    await actualizarFecha(form,proyecto);
    await crearPersonaEtapaProyecto(form,proyecto);
    return await crearEtapaProyecto(form,proyecto);
  }
  return data;
};

const crearEtapaProyecto = async (form, proyecto) => {
  
  const etapa_proyecto = {
    "idProyecto": { "id": proyecto },
    "idEtapa": { "id": form[1].value },
    "fechaInicio": form[3].value,
    "fechaFinal": null,
    "idEstado": { "id": 2 }
  }
    
  const response = await fetch(`${URL_BASE}/etapa_proyectos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(etapa_proyecto),
      });
  const data = await response.json();
  return data;
};

const crearPersonaEtapaProyecto = async (form, proyecto) => {
  
  const etapa_proyecto = { 
    "id": { 
      "proyecto": proyecto,
      "persona": form[5].value, 
      "etapa": form[1].value 
    },
    "fecha": form[3].value }
    
  const response = await fetch(`${URL_BASE}/proyectoPersonas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(etapa_proyecto),
      });
  const data = await response.json();
  return data;
};

const actualizarFecha = async (form, proyecto) => {
  
  let idEtapaProyecto = await fetch(`${URL_BASE}/etapa_proyectos/ult/${proyecto}`)
  const dataEP = await idEtapaProyecto.json();
  
  const response = await fetch(`${URL_BASE}/etapa_proyectos/${dataEP[0].id}/${form[3].value}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
  const data = await response.json();
  return data;
};

// Función para asignar una persona responsable a una tarea
const asignarResponsable = async (nuevaTarea, form) => {
  const responsable = {
    id: {
      idTarea: nuevaTarea.id,
      idPersona:form[5].value,
    },
    fecha: nuevaTarea.fechaInicio,
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
const addTarea = async () => {
  const form = document.querySelector("#formTarea");
  const urlParams = new URLSearchParams(window.location.search);
  let proyecto = urlParams.get('nombreProyecto'); 
  
  const etapaProyecto = await obtenerEtapaProyecto(form,proyecto);

  const nuevaTarea = await crearTarea(etapaProyecto, form);

  const responsable = await asignarResponsable(nuevaTarea, form);

  location.href ="tareas.html?nombreProyecto="+proyecto;
  
  // Hacer alguna acción adicional (por ejemplo, redireccionar a otra página)
};
