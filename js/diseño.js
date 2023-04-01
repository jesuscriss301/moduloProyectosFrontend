const URL_BASE = "http://sistemas:8080";

function cargar() {
    const urlParams = new URLSearchParams(window.location.search);
    let queryParam = urlParams.get('nombreProyecto');
    //console.log(queryParam);
    if (queryParam!=null && queryParam!="") {
        cargarProyecto(queryParam);
    }
}

async function cargarProyecto(id) {
    fetch(`${URL_BASE}/proyectos/${id}`)
    .then(response => response.json())
    .then(data => {
        tablaInfo(data);
        responsable(data.id);
    })
    .catch(error => console.log(error));
}

async function responsable(proyecto) {
        
    const responsable = document.getElementById("responsable");

    fetch(`${URL_BASE}/proyectoPersonas/proyecto/${proyecto}/2`)
    .then(response => response.json())
    .then(data => {
        const idPersonas = data.map(item => item.id.persona);
        const rta = idPersonas.join(", ");
        responsable.textContent = rta;
    })
    .catch(error => console.log(error));
}

function tablaInfo(data) {
    
    const codigo = document.getElementById("codigoProyecto");
    const nombre = document.getElementById("nombreProyecto");
    const tipo= document.getElementById("tipoProyecto");
    
    codigo.textContent=data.id;
    nombre.textContent=data.nombreProyecto;
    tipo.textContent=data.idTipoProyecto.nombre;

}

