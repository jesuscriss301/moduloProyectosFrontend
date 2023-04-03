const URL_BASE = "http://sistemas:8080";

// Función para enviar una petición POST a la API y crear una nueva tarea
const crearProyecto = async (form) => {
  const nuevoProyecto = {
    "idTipoProyecto":{"id":form[1].value},
    "nombreProyecto":form[0].value,
    "descripcionProyecto":form[2].value,
    "idPrioridad":{"id":form[3].value},
    "justificacion":form[4].value,
    "objetivoGeneral":form[5].value,
    "objetivoEspecifico":form[6].value,
    "ubicacion":form[7].value
    };

  const response = await fetch(`${URL_BASE}/proyectos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoProyecto),
  });
  const data = await response.json();
  return data;
};

// Función para obtener los datos de una etapa de proyecto por su ID
const obtenerEtapaProyecto = async (proyecto) => {
    const etapa_proyecto= {
    "idProyecto":{"id":1},
    "idEtapa":{"id":1},
    "fechaInicio":"2023-02-22",
    "fechaFinal":"2023-03-01",
    "idEstado":{"id":1}
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

// Función para asignar una persona responsable a una tarea
const asignarResponsable = async (nuevoProyecto) => {
    console.log(nuevoProyecto.id);
  const responsable = {
    "id":{
        "proyecto":nuevoProyecto.id,
        "persona":1,
        "etapa":1},
    "fecha":fecha()
  };

  const response = await fetch(`${URL_BASE}/proyectoPersonas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(responsable),
  });
  const data = await response.json();
  return data;
}

function fecha() {
    var f = new Date();
    let dia=f.getDate();
    let mes=(f.getMonth() +1);
    if (dia<10) {
      dia="0"+dia;
    }
    if (mes<10) {
      mes="0"+mes;
    }
    return  f.getFullYear()+ "-"+mes+ "-"+dia ;
}


// Función principal que se encarga de crear una nueva tarea, asignar un responsable, y hacer alguna acción adicional
const addProyecto = async () => {
  const form = document.querySelector("#formProyecto");  

  const nuevoProyecto = await crearProyecto(form);

  //const responsable = await asignarResponsable(nuevoProyecto);

  const etapa = await asignarResponsable(nuevoProyecto);


  //location.href ="proyectos.html";
  
  // Hacer alguna acción adicional (por ejemplo, redireccionar a otra página)
};