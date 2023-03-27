function cargarTablaProyectos() {
  //Tabla();
  consultaNombreProyecto()
}

function consultaNombreProyecto() {
  const urlParams = new URLSearchParams(window.location.search);
  const queryParam = urlParams.get('nombreProyecto');
  if (queryParam!="" && queryParam!=null) {
    Tabla(queryParam)
  }else{
    Tabla("*");
    console.log("*");
  }
  console.log(queryParam); // "JavaScript"  
}

function Tabla(busqueda) {
  google.charts.load('current', {'packages':['table']});
  google.charts.setOnLoadCallback(() => {
    proyectos(busqueda).then(data => {
      drawTable(data);
    });
  });
}

async function proyectos(busqueda) {
  fetch('http://sistemas:8080/proyectos/tablaProyectos/'+busqueda+"/")
    .then(response => response.json())
    .then(data => drawTable(data))
    .catch(error => console.log(error));
}

function drawTable(info) {
  
  var data = new google.visualization.arrayToDataTable(info);
  var table = new google.visualization.Table(document.getElementById('table_div'));
  table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});
}

function alerta() {
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  alertPlaceholder.setAttribute("class", "m-3");
  setTimeout(function() {
    alertPlaceholder.setAttribute("class", "visually-hidden");
  }, 2500);
}

function despliegue(number) {
  
  // construir la URL con el parámetro de consulta
  const url = `file:///C:/Users/SISTEMAS/Documents/aplicacion%20planta/moduloProyectosFrontend/moduloProyectosFrontend/html/proyectos.html?nombreProyecto=${number}`;
  // redirigir a la página con la URL construida
  window.location.href = url;
    desplegarEtapa(number);
  
}
/*
const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    alert('Nice, you triggered this alert message!', 'success')
  })
}
*/