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
google.charts.setOnLoadCallback(ganntfetch);

function ganntfetch() {
  fetch('http://sistemas:8080/tareas/proyecto/1')
    .then(response => response.json())
    .then(data => drawChart(data))
    .catch(error => console.log(error));
}

function drawChart(info) {
  console.log(info);
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Task ID');
  data.addColumn('string', 'Task Name');
  data.addColumn('string', 'Resource');
  data.addColumn('date', 'Start Date');
  data.addColumn('date', 'End Date');
  data.addColumn('number', 'Duration');
  data.addColumn('number', 'Percent Complete');
  data.addColumn('string', 'Dependencies');

  var nuevo = Array(info.length);

  for (let i = 0; i < info.length; i++) {
    const element = info[i];
    console.log(element.fechaInicio);
    console.log(element.fechaFinal);
    //element.fechaInicio
    //element.fechaFinal
    nuevo[0]="#"+element.id;
    nuevo[1]=element.nombreTarea;
    nuevo[2]=element.idEtapaProyecto.idEtapa.nombreEtapa;
    var fechaFinal = new Date(element.fechaFinal);
    var fechainicial = new Date(element.fechaFinal);
    if (element.fechaInicioReal ==null) {
      fechainicial=new Date(element.fechaInicio);
      fechaFinal= new Date(element.fechaFinal);
      nuevo[6]=0;
    } else {if (element.fechaFinalReal != null) {
      fechainicial=new Date(element.fechaInicioReal);
        fechaFinal=new Date(element.fechaFinal);
        //nuevo[5]= ((fechaFinal - nuevo[3].getTime())/(1000*60*60*24))+1;
        nuevo[6]=100;
      }else{
        fechainicial=new Date(element.fechaInicioReal);
        fechaFinal=new Date(element.fechaFinal);
        //nuevo[5]= ((fechaFinal - nuevo[3].getTime())/(1000*60*60*24))+1
        nuevo[6]=50;
      }
    }
    nuevo[3]=new Date(fechainicial.getTime()-(1000*60*60*14));
    nuevo[4]=new Date(fechaFinal.getTime()+(1000*60*60*4));
    nuevo[5]= null;
    nuevo[7]=null;
    console.log(nuevo[4]+"   "+nuevo[3]);
    data.addRow(nuevo);
  }
  //console.log(data);

  var options = {
    height: 400,
    gantt: {
      trackHeight: 30
    }
  };

  var chart = new google.visualization.Gantt(document.getElementById('chart_div'));

  chart.draw(data, options);
}
}