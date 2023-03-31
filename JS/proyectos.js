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

async function Tabla(busqueda) {
  google.charts.load('current', {'packages':['table']});
  await google.charts.setOnLoadCallback(() => {
    proyectos(busqueda)
  });
}

async function proyectos(busqueda) {
  fetch('http://sistemas:8080/proyectos/tablaProyectos/'+busqueda+"/")
    .then(response => response.json())
    .then(data => drawTable(data))
    .catch(error => console.log(error));
}

function drawTable(info) {
  try {
    var data = new google.visualization.arrayToDataTable(info);
    var table = new google.visualization.Table(document.getElementById('table_div'));
    table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});
    tablaestilo();
  } catch (error) {
    console.log(info);
  }
  
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

  for (let i of row) {
    let cell = i.querySelectorAll("td");
    i.setAttribute("data-id",cell[0].textContent);    
    i.addEventListener("dblclick",  () => {
      const idproyecto = i.getAttribute("data-id");
      window.location.href = `tareas.html?nombreProyecto=${idproyecto}`;
    });
    let lastTouchTime = 0;
    const touchThreshold = 300; 
    i.addEventListener("touchstart",function() {
        const currentTime = new Date().getTime();
        const timeSinceLastTouch = currentTime - lastTouchTime;
      
        if (timeSinceLastTouch < touchThreshold) {
            const idproyecto = i.getAttribute("data-id");
            window.location.href = `tareas.html?nombreProyecto=${idproyecto}`;
          }
      
        lastTouchTime = currentTime;
      });
  };
}