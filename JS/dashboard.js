function cargaDiagramas() {
    diagramaCircular();
    DiagramaBarras();
    TablaInform();
    DiagramaGannt();
}

//Diagrama Circular//
function diagramaCircular() {
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(circularfetch);

  function drawChart(data) {
    console.log(data)
    var data = google.visualization.arrayToDataTable(data);
  
    var options = {
      title: 'Tipos de proyectos en ejecuciòn<<',
      is3D: true,
    };
  
    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(data, options);
  }

  function circularfetch() {
    fetch('http://sistemas:8080/proyectos/circular')
      .then(response => response.json())
      .then(data => drawChart(data))
      .catch(error => console.log(error));
  }
    
  
  
}


//Diagrama de barras//

function DiagramaBarras() {
google.charts.load('current', {'packages':['bar']});
google.charts.setOnLoadCallback(barrasfetch);
  
    function drawChart(data) {
      console.log(data)
      var data = google.visualization.arrayToDataTable(data);
  
        var options = {
            chart: {
              title: 'Proyectos & avance',

            }
        };
  
        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
  
          chart.draw(data, google.charts.Bar.convertOptions(options));
        }
        function barrasfetch() {
          fetch('http://sistemas:8080/proyectos/barras')
            .then(response => response.json())
            .then(data => drawChart(data))
            .catch(error => console.log(error));
        }
}

//Tabla de informacion//

function TablaInform() {
google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(tablafetch);

function drawTable(datas) {
  console.log(datas)
  var data = google.visualization.arrayToDataTable(datas);

  var table = new google.visualization.Table(document.getElementById('table_div'));

  table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
}
function tablafetch() {
  fetch('http://sistemas:8080/proyectos/tabla')
    .then(response => response.json())
    .then(data => drawTable(data))
    .catch(error => console.log(error));
}

}

//Diagrama de Gannt//

function DiagramaGannt() {
    
google.charts.load('current', {'packages':['gantt']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Task ID');
  data.addColumn('string', 'Task Name');
  data.addColumn('string', 'Resource');
  data.addColumn('date', 'Start Date');
  data.addColumn('date', 'End Date');
  data.addColumn('number', 'Duration');
  data.addColumn('number', 'Percent Complete');
  data.addColumn('string', 'Dependencies');

  data.addRows([ ['2014Spring', 'Spring 20114', 'spring',
     new Date(2014, 2, 22), new Date(2014, 5, 20), 10, 100, null],]);

  var options = {
    height: 400,
    gantt: {
      title: 'Proyectos',
      trackHeight: 30
      }
  };
 var chart = new google.visualization.Gantt(document.getElementById('chart_div'));

  chart.draw(data, options);
}
function tablafetch() {
  fetch('http://sistemas:8080/tareas/proyecto/1')
    .then(response => response.json())
    .then(data => drawTable(data))
    .catch(error => console.log(error));
}
}