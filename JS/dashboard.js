function cargaDiagramas() {
    diagramaCircular();
    DiagramaBarras();
    TablaInform();
    //DiagramaGannt();
    
}

//Diagrama Circular//
function diagramaCircular() {
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(circularfetch);

  function drawChart(data) {
    var data = google.visualization.arrayToDataTable(data);
  
    var options = {
      title: 'Tipos de proyectos en ejecuciòn',
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
function DiagramaGannt(number) {    
google.charts.load('current', {'packages':['gantt']});
google.charts.setOnLoadCallback(ganntfetch(number));

function ganntfetch(number) {
  console.log(number);
  fetch('http://sistemas:8080/tareas/proyecto/'+number)
    .then(response => response.json())
    .then(data => drawChart(data))
    .catch(error => console.log(error));
}

function drawChart(info) {
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
  
  const proyectoNombre = document.getElementById("nombreProyecto");
  proyectoNombre.textContent = info[0].idEtapaProyecto.idProyecto.nombreProyecto;
  for (let i = 0; i < info.length; i++) {
    const element = info[i];
    nuevo[0]="#"+element.id;
    nuevo[1]=element.nombreTarea;
    nuevo[2]=element.idEtapaProyecto.idEtapa.nombreEtapa;
    var fechaFinal = new Date(element.fechaFinal);
    var fechainicial = new Date(element.fechaFinal);
    if (element.fechaInicioReal ==null) {
      fechainicial=new Date(element.fechaInicio);
      fechaFinal= new Date(element.fechaFinal);
      nuevo[6]=0;
    } else {if (element.fechaFinalReal == null) {
      fechainicial=new Date(element.fechaInicioReal);
        fechaFinal=new Date(element.fechaFinal);
        nuevo[6]=100;
      }else{
        fechainicial=new Date(element.fechaInicioReal);
        fechaFinal=new Date(element.fechaFinalReal);
        nuevo[6]=50;
      }
    }
    if (fechainicial.getTime()+(1000*60*60*10) < fechaFinal.getTime()+(1000*60*60*26)) {
      nuevo[3]=new Date(fechainicial.getTime()+(1000*60*60*10));
      nuevo[4]=new Date(fechaFinal.getTime()+(1000*60*60*26));
    }else{
      nuevo[3]=new Date(fechainicial.getTime()+(1000*60*60*10));
      nuevo[4]=new Date(fechainicial.getTime()+(1000*60*60*26));
    }
    /*
    console.log(nuevo[1]+": \n"+nuevo[3]+"-----"+nuevo[4]+"\n" +fechainicial+"-----"+fechaFinal+"\n"
                           +element.fechaInicio+"-----"+element.fechaFinal+"\n"
                          +element.fechaInicioReal+"-----"+element.fechaFinalReal);
    
    */
    nuevo[5]= null;
    nuevo[7]=null;
    data.addRow(nuevo);
  }

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

function etapa(number) {

  const proyectoDropdown = document.getElementById("SeleccionarProyecto");
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
    case 5:etapa="Ejeución";
      break;
    case 6:etapa="Completado";
      break;
    case 7:etapa="Archivado";
      break; 
    case 8:etapa="Descartado";
     break;
    default:etapa= "Etapa"
}

etapaDropdown.innerText=etapa;
  proyectoDropdown.disabled = false;
  desplegable(number);

}

function desplegable(number) {
  
  fetch('http://sistemas:8080/proyectos/etapa/'+number)
            .then(response => response.json())
            .then(data => proyectos(data))
            .catch(error => console.log(error));
// Create a new li element
  function proyectos(data) {
  
  for (let i = 0; i < data.length; i++) {
    
    const proyectoDropdown = document.getElementById("proyecto");

    const newListItem = document.createElement("li");
    const element = data[i];
    // Create a new a element
    const newLink = document.createElement("button");
    newLink.setAttribute("class", "dropdown-item");
    console.log(element.id);
    newLink.setAttribute("onclick", "DiagramaGannt("+ element.id +")");
    //newLink.setAttribute("href", "#");
    newLink.textContent = element.nombreProyecto;
    
    // Append the newLink to the newListItem
    newListItem.appendChild(newLink); 
    proyectoDropdown.appendChild(newListItem);
  }
  
  // Append the newListItem to the proyectoDropdown
  
}

}