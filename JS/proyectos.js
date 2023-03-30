function cargarTablaProyectos() {
  //Tabla();
  consultaNombreProyecto();
}

function consultaNombreProyecto() {
  const urlParams = new URLSearchParams(window.location.search);
  const queryParam = urlParams.get('nombreProyecto');
  if (queryParam!="" && queryParam!=null) {
    Tabla(queryParam)
  }else{
    Tabla("*");
  } // "JavaScript"  
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

  tablaestilo();
}

function despliegue(number) {
  
  var currentPathname = window.location.pathname;
  // construir la URL con el parámetro de consulta
  const url = `${currentPathname}?nombreProyecto=${number}`;
  // redirigir a la página con la URL construida
  window.location.href = url;
    desplegarEtapa(number);
  
}

function tablaestilo() {
  let tabla= document.querySelector("table");
  tabla.setAttribute("class","table table-striped table-hover");
  let tbody = tabla.querySelector("tbody");
  let row = tbody.querySelectorAll("tr");

  for (let i in row) {
    let cell = row[i].querySelectorAll("td");
    row[i].setAttribute("data-id",cell[0].textContent);    
    row[i].addEventListener("dblclick",  () => {
      const idproyecto = row[i].getAttribute("data-id");
      window.location.href = `tareas.html?nombreProyecto=${idproyecto}`;
    });
  };
}