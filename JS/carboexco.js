const URL_RESPONSABLE = "http://sistemas:8083";
function direccion(direccion) {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const queryParam = urlParams.get('nombreProyecto');
      let a= parseInt(queryParam);
      if (isNaN(a)) {
      alerta("Seleccione un proyecto para continuar"); 
      }else{
        location.href =direccion+"?nombreProyecto="+queryParam;
      }
    } catch (error) {
      alerta("Seleccione un proyecto para continuar")
    }
}  

function direccionProyecto(direccion) {
      location.href =direccion;
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

function alertaPermanente(text) {
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
  const mensaje = document.getElementById('alerta');
  alertPlaceholder.setAttribute("class", "m-3");
  mensaje.innerText=text;
}  

  function desplegarEtapa(number) {
  
    const etapaDropdown = document.getElementById("etapa");
    let etapa="";
    
    switch (number) {
      case 1:etapa="Crear proyecto";
        break;
      case 2:etapa="Diseño";
        break;
      case 3:etapa="Reparación y presupuesto";
        break;
      case 4:etapa="Programación";
        break;
      case 5:etapa="Ejecución";
        break;
      case 6:etapa="Completado";
        break;
      case 7:etapa="Archivado";
        break; 
      case 8:etapa="Descartado";
       break;
      default:etapa= "Etapa";
    }
    etapaDropdown.innerText=etapa;
}

function direccionbitacoras(direccion) {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const queryParam = urlParams.get('nombreProyecto');
      const queryParamTarea = urlParams.get('idTarea');
      let a= parseInt(queryParam);
      let b =parseInt(queryParamTarea);
      if (isNaN(a)&&isNaN(b)) {
      alerta("Seleccione un proyecto para continuar"); 
      }else{
        window.location.href = `${direccion}?nombreProyecto=${a}&idTarea=${b}`;
      }
    } catch (error) {
      alerta("Seleccione un proyecto para continuar")
    }
}

async function nombreResponsable(id) {

  const response = await fetch(`${URL_RESPONSABLE}/personas/${id}`);
  const json =await response.json();
  return json;
}
  