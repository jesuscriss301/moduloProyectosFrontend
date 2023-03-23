function cargarTabla() {
  Tabla();
}

function Tabla() {

google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(proyectos);

function proyectos(number) {
console.log(number);
fetch('http://sistemas:8080/proyectos/tablaProyectos')
  .then(response => response.json())
  .then(data => drawTable(data))
  .catch(error => console.log(error));
}

function drawTable(info) {
console.log(info);
var data = new google.visualization.arrayToDataTable(info);
var table = new google.visualization.Table(document.getElementById('table_div'));

table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});
}}