function cargarTabla() {
  //Tabla();
  consultaNombreProyecto()
}
function Tabla(busqueda) {
google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(proyectos(busqueda));
function proyectos(busqueda) {
fetch('http://sistemas:8080/proyectos/tablaProyectos/'+busqueda+"/")
  .then(response => response.json())
  .then(data => drawTable(data))
  .catch(error => console.log(error));
}
function drawTable(info) {
  
var data = new google.visualization.arrayToDataTable(info);
var table = new google.visualization.Table(document.getElementById('table_div'));
table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});
}}
function consultaNombreProyecto() {
  const urlParams = new URLSearchParams(window.location.search);
  const queryParam = urlParams.get('nombreProyecto');
  if (queryParam!="" && queryParam!=null) {
    Tabla(queryParam)
  }else{
    Tabla("*");
  }
  console.log(queryParam); // "JavaScript"  
}
function alerta() {
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  alertPlaceholder.setAttribute("class", "m-3");
  setTimeout(function() {
    alertPlaceholder.setAttribute("class", "visually-hidden");
  }, 2500);
}
/*
const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    alert('Nice, you triggered this alert message!', 'success')
  })
}
*/