function cargarTabla() {
<<<<<<< HEAD
    Tabla();
}

function Tabla() {
  
=======
  Tabla();
}

function Tabla() {

>>>>>>> 5a9ac2771f9726e88f7d8835376d30ee82bb7f93
google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(proyectos);

function proyectos(number) {
<<<<<<< HEAD
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
 
 
 
 
 
 
=======
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
>>>>>>> 5a9ac2771f9726e88f7d8835376d30ee82bb7f93
