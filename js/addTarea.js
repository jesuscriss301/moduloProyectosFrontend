function addTarea(idEtapaProyecto){
    let form= document.querySelector("#formTarea");
    console.log(form[0].value);
    var nuevo={
    "idEtapaProyecto":{
        "id":idEtapaProyecto,
        "idProyecto":{"id":1
        ,"idTipoProyecto":{"id":1
        ,"nombre":"Obras civiles"}
        ,"nombreProyecto":"Cuneta de prueba ",
        "descripcionProyecto":"este proyecto es de prueba para la base de datos.",
        "idPrioridad":{"id":3,"nombrePrioridad":"Baja"},
        "justificacion":null,
        "objetivoGeneral":"validad pruebas de garantía de la base de datos",
        "objetivoEspecifico":null,"ubicacion":"oficina de carboexco"},
        "idEtapa":{"id":1,"nombreEtapa":"Crear Proyecto"},
        "fechaInicio":"2023-02-22",
        "fechaFinal":"2023-03-01",
        "idEstado":{"id":1,
        "nombreEstado":"Aprovado"}},
    "nombreTarea":form[0].value,
    "descripcionTarea":form[1].value,
    "fechaInicio":form[2].value,
    "fechaFinal":form[3].value,
    "fechaInicioReal":null,
    "fechaFinalReal":null}

    console.log(nuevo);
  
    var url="http://sistemas:8080/tareas" ;
        const response =  fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(nuevo) // body data type must match "Content-Type" header
          });
    window.location='tarea.html';
    
  }