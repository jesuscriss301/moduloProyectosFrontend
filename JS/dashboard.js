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

  data.addRows([
    ['2014Spring', 'Spring 20114', 'spring',
     new Date(2014, 2, 22), new Date(2014, 5, 20), 10, 100, null],
    ['2014Summer', 'Summer 2014', 'summer',
     new Date(2014, 5, 21), new Date(2014, 8, 20), null, 100, null],
    ['2014Autumn', 'Autumn 2014', 'autumn',
     new Date(2014, 8, 21), new Date(2014, 11, 20), null, 100, null],
    ['2014Winter', 'Winter 2014', 'winter',
     new Date(2014, 11, 21), new Date(2015, 2, 21), null, 100, null],
    ['2015Spring', 'Spring 2015', 'spring',
     new Date(2015, 2, 22), new Date(2015, 5, 20), null, 100, null],
    ['2015Summer', 'Summer 2015', 'summer',
     new Date(2015, 5, 21), new Date(2015, 8, 20), null, 0, null],
    ['2015Autumn', 'Autumn 2015', 'autumn',
     new Date(2015, 8, 21), new Date(2015, 11, 20), null, 0, null],
    ['2015Winter', 'Winter 2015', 'winter',
     new Date(2015, 11, 21), new Date(2016, 2, 21), null, 0, null],
  ]);

  var options = {
    height: 400,
    gantt: {
      trackHeight: 30
    }
  };
 var chart = new google.visualization.Gantt(document.getElementById('chart_div'));

  chart.draw(data, options);
}}