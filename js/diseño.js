const URL_BASE = "http://192.168.1.10:8084";
const URL_IMG = "http://192.168.1.10:8081";

function cargar() {
    const urlParams = new URLSearchParams(window.location.search);
    let queryParam = urlParams.get('nombreProyecto');
    if (queryParam!=null && queryParam!="") {
        cargarProyecto(queryParam);
        cargarDisenos(queryParam);
    }
}
function cargarpdf(archivo) {
    
    const pdf =document.getElementById("pdf");
    pdf.setAttribute("src",`${URL_IMG}/filesPDF/view/${archivo}`)

}

async function cargarProyecto(id) {
    fetch(`${URL_BASE}/proyectos/${id}`)
    .then(response => response.json())
    .then(data => {
        tablaInfo(data);
        responsable(data.id);
        cargardiseno(data.id);
    })
    .catch(error => console.log(error));
}

async function cargardiseno(proyecto) {
    const NombreDiseño = document.getElementById("NombreDiseño");
    const area = document.getElementById("area");
    const fecha = document.getElementById("fecha");
    
    fetch(`${URL_BASE}/disenos/proyecto/${proyecto}`)
        .then(response => response.json())
        .then(data => {
            const urlParams = new URLSearchParams(window.location.search);
            let diseno = urlParams.get('iddiseno');
            let a = parseInt(diseno);
            if (!isNaN(a)) {
                console.log(data);
                cargarpdf(data[a].idFoto);
                NombreDiseño.textContent = data[a].nombreDiseno;
                area.textContent = data[a].areaTerreno+" metros";
                fecha.textContent = data[a].fecha;
            } else {
                if (data.length == 0) {
                    alertaPermanente("Lo siento, pero no se puede continuar con el proyecto en este momento, ya que no se ha encontrado ningún diseño asociado. ");
                    let botondisenos = document.getElementById("disenosButton");
                    botondisenos.disabled = true;
                }
                else {
                    console.log(data);
                    cargarpdf(data[0].idFoto);
                    NombreDiseño.textContent = data[0].nombreDiseno;
                    area.textContent = data[0].areaTerreno+" metros";
                    fecha.textContent = data[0].fecha;
                }
            }
        })
        .catch(error => console.log(error));
}

async function responsable(proyecto) {

    const responsable = document.getElementById("responsable");

    const response = await fetch(`${URL_BASE}/proyectoPersonas/proyecto/${proyecto}/2`);
    const data = await response.json();

    const idPersonas = data.map(item => item.id.persona);
    const rta = idPersonas.join(", ");
    const nombres = await nombreResponsable(rta);
    responsable.textContent = nombres;

}

function tablaInfo(data) {
    
    const codigo = document.getElementById("codigoProyecto");
    const nombre = document.getElementById("nombreProyecto");
    const tipo= document.getElementById("tipoProyecto");
    
    codigo.textContent=data.id;
    nombre.textContent=data.nombreProyecto;
    tipo.textContent=data.idTipoProyecto.nombre;

}

async function cargarDisenos(proyecto) {
    
    fetch(`${URL_BASE}/disenos/proyecto/${proyecto}`)
    .then(response => response.json())
    .then(data => cargarfiltro(data,proyecto))
    .catch(error => console.log(error));
}

function cargarfiltro(data,proyecto) {
    const proyectoDropdown = document.getElementById("disenoProyecto");
    proyectoDropdown.innerHTML="";
    
  for (let i = 0; i < data.length; i++) {
    
    const newListItem = document.createElement("li");
    const element = data[i];
        // Create a new a element
    const newLink = document.createElement("button");
    newLink.setAttribute("class", "dropdown-item");
    newLink.setAttribute("onclick", "desplegable("+ i+",'"+ proyecto +"')");
    newLink.textContent = element.id+"- " +element.nombreDiseno;
 
        // Append the newLink to the newListItem
    newListItem.appendChild(newLink); 
    proyectoDropdown.appendChild(newListItem); 
  }
}

function desplegable(diseno,proyecto) {
    const proyectoDropdown = document.getElementById("disenosButton");
    proyectoDropdown.innerText=`${diseno}`;

    var currentHostname = window.location.hostname;
    var currentPathname = window.location.pathname;
    var currentSearch = window.location.search;
    var currentHash = window.location.hash;

    const url = `${currentPathname}?nombreProyecto=${proyecto}&iddiseno=${diseno}`;
    // redirigir a la página con la URL construida
    window.location.href = url;
    
}

