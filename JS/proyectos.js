const URL_BASE = "http://192.168.1.211:8080";

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
  const response = await fetch(`${URL_BASE}/proyectos/tablaProyectos/${busqueda}/`)
  const json = await response.json();
  for (let index = 1; index < json.length; index++) {
    const element = json[index][2];
    json[index][2]=await nombreResponsable(element);
  }
  
  drawTable(json);
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
      window.location.href = `Tareas.html?nombreProyecto=${idproyecto}`;
    });
    let lastTouchTime = 0;
    const touchThreshold = 300; 
    i.addEventListener("touchstart",function() {
        const currentTime = new Date().getTime();
        const timeSinceLastTouch = currentTime - lastTouchTime;
      
        if (timeSinceLastTouch < touchThreshold) {
            const idproyecto = i.getAttribute("data-id");
            window.location.href = `Tareas.html?nombreProyecto=${idproyecto}`;
          }
      
        lastTouchTime = currentTime;
      });
  };
}