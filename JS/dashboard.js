const URL_BASE = "http://192.168.1.211:8080";

function cargaDiagramas() {
  diagramaCircular();
  DiagramaBarras();
  TablaInform();
  //DiagramaGannt();

}

//Diagrama Circular//
function diagramaCircular() {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(() => {
    circularfetch().then(data => {
      drawChart(data);
    });
  });

  function drawChart(data) {
    var data = google.visualization.arrayToDataTable(data);

    var options = {
      title: 'Tipos de proyectos en ejecuciòn',
      is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(data, options);
  }

  async function circularfetch() {
    fetch(`${URL_BASE}/proyectos/circular`)
      .then(response => response.json())
      .then(data => drawChart(data))
      .catch(error => console.log(error));
  }
}

//Diagrama de barras//
function DiagramaBarras() {
  google.charts.load('current', { 'packages': ['bar'] });
  google.charts.setOnLoadCallback(() => {
    barrasfetch().then(data => {
      drawChart(data);
    });
  });

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
  async function barrasfetch() {
    fetch(`${URL_BASE}/proyectos/barras`)
      .then(response => response.json())
      .then(data => drawChart(data))
      .catch(error => console.log(error));
  }
}

//Tabla de informacion//
function TablaInform() {
  google.charts.load('current', { 'packages': ['table'] });
  google.charts.setOnLoadCallback(tablafetch);

  function drawTable(datas) {
    var data = google.visualization.arrayToDataTable(datas);

    var table = new google.visualization.Table(document.getElementById('table_div'));

    table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
  }
  async function tablafetch() {
    const response = await fetch(`${URL_BASE}/proyectos/tabla`)
    const json = await response.json();

    for (let index = 1; index < json.length; index++) {
      const element = json[index][1];
      json[index][1]=await nombreResponsable(element) || element;
    }
    
    drawTable(json);
  }

}

//Diagrama de Gannt//
function DiagramaGannt(number) {
  google.charts.load('current', { 'packages': ['gantt'] });
  google.charts.setOnLoadCallback(() => {
    ganntfetch(number).then(data => {
      drawChart(data);
    });
  });


  async function ganntfetch(number) {
    fetch(`${URL_BASE}/tareas/proyecto/${number}`)
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
      nuevo[0] = "#" + element.id;
      nuevo[1] = element.nombreTarea;
      nuevo[2] = element.idEtapaProyecto.idEtapa.nombreEtapa;
      var fechaFinal = new Date(element.fechaFinal);
      var fechainicial = new Date(element.fechaFinal);
      if (element.fechaInicioReal == null) {
        fechainicial = new Date(element.fechaInicio);
        fechaFinal = new Date(element.fechaFinal);
        nuevo[6] = 0;
      } else {
        if (element.fechaFinalReal == null) {
          fechainicial = new Date(element.fechaInicioReal);
          fechaFinal = new Date(element.fechaFinal);
          nuevo[6] = 100;
        } else {
          fechainicial = new Date(element.fechaInicioReal);
          fechaFinal = new Date(element.fechaFinalReal);
          nuevo[6] = 50;
        }
      }
      if (fechainicial.getTime() + (1000 * 60 * 60 * 10) < fechaFinal.getTime() + (1000 * 60 * 60 * 26)) {
        nuevo[3] = new Date(fechainicial.getTime() + (1000 * 60 * 60 * 10));
        nuevo[4] = new Date(fechaFinal.getTime() + (1000 * 60 * 60 * 26));
      } else {
        nuevo[3] = new Date(fechainicial.getTime() + (1000 * 60 * 60 * 10));
        nuevo[4] = new Date(fechainicial.getTime() + (1000 * 60 * 60 * 26));
      }
      nuevo[5] = null;
      nuevo[7] = null;
      data.addRow(nuevo);
    }

    var options = {
      height: "110%",
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
  desplegarEtapa(number);
  proyectoDropdown.disabled = false;
  proyectoDropdown.setAttribute("onclick", "agreagarTarea(" + number + ")")
  desplegable(number);

}

function desplegable(number) {

  const proyectoDropdown = document.getElementById("proyecto");
  proyectoDropdown.innerHTML = "";

  fetch(`${URL_BASE}/proyectos/etapa/${number}`)
    .then(response => response.json())
    .then(data => proyectos(data))
    .catch(error => console.log(error));
  // Create a new li element
  function proyectos(data) {

    for (let i = 0; i < data.length; i++) {

      const newListItem = document.createElement("li");
      const element = data[i];
      // Create a new a element
      const newLink = document.createElement("button");
      newLink.setAttribute("class", "dropdown-item");
      newLink.setAttribute("onclick", "DiagramaGannt(" + element.id + ")");
      newLink.textContent = element.nombreProyecto;

      // Append the newLink to the newListItem
      newListItem.appendChild(newLink);
      proyectoDropdown.appendChild(newListItem);
    }

    // Append the newListItem to the proyectoDropdown

  }
}