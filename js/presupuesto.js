const URL_BASE = "http://sistemas:8080";

function cargar() {
    const urlParams = new URLSearchParams(window.location.search);
    let queryParam = urlParams.get('nombreProyecto');
    if (queryParam != null && queryParam != "") {
        cargarProyecto(queryParam);
        cargarPresupuesto(queryParam);
    }

}

async function cargarPresupuesto(proyecto) {

    fetch(`${URL_BASE}/presupuestos/proyecto/${proyecto}`)
        .then(response => response.json())
        .then(data => cargarfiltro(data, proyecto))
        .catch(error => console.log(error));
}

function cargarfiltro(data, proyecto) {
    const proyectoDropdown = document.getElementById("PresupuestoProyecto");
    proyectoDropdown.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        const newListItem = document.createElement("li");
        const element = data[i];
        // Create a new a element
        const newLink = document.createElement("button");
        newLink.setAttribute("class", "dropdown-item");
        newLink.setAttribute("onclick", "desplegable(" + i + "," + proyecto + ")");
        newLink.textContent = element.id + "- Presupuesto";

        // Append the newLink to the newListItem
        newListItem.appendChild(newLink);
        proyectoDropdown.appendChild(newListItem);
    }
}

function desplegable(presupuesto, proyecto) {
    const proyectoDropdown = document.getElementById("presupuestoButton");
    proyectoDropdown.innerText = `${presupuesto}`;

    var currentHostname = window.location.hostname;
    var currentPathname = window.location.pathname;
    var currentSearch = window.location.search;
    var currentHash = window.location.hash;

    const url = `${currentPathname}?nombreProyecto=${proyecto}&idPresupuesto=${presupuesto}`;
    // redirigir a la página con la URL construida
    window.location.href = url;

}

async function cargarProyecto(id) {
    fetch(`${URL_BASE}/proyectos/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            tablaInfo(data);
            responsable(data.id);
            cargarPresupuestos(data.id);
        })
        .catch(error => console.log(error));
}

async function cargarPresupuestos(proyecto) {
    const codigoPresupueso = document.getElementById("codigoPresupueso");
    const costo = document.getElementById("costo");
    const estado = document.getElementById("estado");
    console.log(proyecto);

    fetch(`${URL_BASE}/presupuestos/proyecto/${proyecto}`)
        .then(response => response.json())
        .then(data => {
            const urlParams = new URLSearchParams(window.location.search);
            let presupuesto = urlParams.get('idPresupuesto');
            let a = parseInt(presupuesto);
            if (!isNaN(a)) {
                cargarItems(data[a].id);
                codigoPresupueso.textContent = data[a].id;
                costo.textContent = data[a].costoTotal;
                estado.textContent = data[a].idEstado.nombreEstado;
            } else {
                cargarItems(data[0].id);
                codigoPresupueso.textContent = data[0].id;
                costo.textContent = data[0].costoTotal;
                estado.textContent = data[0].idEstado.nombreEstado;
            }

        })
        .catch(error => console.log(error));
}

async function responsable(proyecto) {

    const responsable = document.getElementById("responsable");

    fetch(`${URL_BASE}/proyectoPersonas/proyecto/${proyecto}/3`)
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
    const tipo = document.getElementById("tipoProyecto");

    codigo.textContent = data.id;
    nombre.textContent = data.nombreProyecto;
    tipo.textContent = data.idTipoProyecto.nombre;

}

async function cargarItems(presupuesto) {
    fila("Personal", presupuesto);
    fila("Maquinaria", presupuesto);
    fila("Material", presupuesto);
    fila("Herramienta", presupuesto);
}
async function fetchData(tipo, presupuesto) {
    if (tipo === "Personal") {
        const response = await fetch(`${URL_BASE}/presupuestoPersonals/proyecto/${presupuesto}`);
        return await response.json();
    } else {
        const response = await fetch(`${URL_BASE}/presupuestoMaterials/${presupuesto}/${tipo}`);
        return await response.json();
    }
}

function updateUI(tipo, data) {
    const tabla = document.getElementById(`${tipo}table`);
    tabla.innerHTML = "";

    const boton = document.getElementById(`button${tipo}`);
    boton.disabled = (data.length === 0);
    boton.setAttribute("class", `accordion-button ${boton.disabled ? "collapsed" : ""} btn btn-outline-secondary`);

    for (const material of data) {
        const row = document.createElement("tr");

        const cell1 = document.createElement("td");
        cell1.textContent = tipo === "Personal" ? material.idPersonal.id : material.idMaterial.idProducto;

        const cell2 = document.createElement("td");
        cell2.textContent = tipo === "Personal" ? material.idPersonal.cargo : material.idMaterial.idProducto;

        const cell3 = document.createElement("td");
        cell3.textContent = material.cantidad;

        const cell4 = document.createElement("td");
        cell4.textContent = material.costo;

        const cell5 = document.createElement("td");
        cell5.textContent = material.tiempoUso;

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);

        tabla.appendChild(row);
    }
}

async function fila(tipo, presupuesto) {
    const data = await fetchData(tipo, presupuesto);
    updateUI(tipo, data);
}

async function agregar() {
    let presupuesto = document.getElementById("codigoPresupueso");
    let a = parseInt(presupuesto.textContent);
    if (!isNaN(a)) {
        const form = document.getElementById("agregarPresupuesto");

        let nuevo = {
            "id": {
                "idPresupuesto": a,
                "idMaterial": parseInt(form[0].value)
            },
            "idPresupuesto": { "id": a },
            "idMaterial": { "id": parseInt(form[0].value) },
            "cantidad": parseInt(form[2].value),
            "costo": parseInt(form[1].value),
            "tiempoUso": parseInt(form[3].value)
        }
        console.log(`${a}-${parseInt(form[0].value)}-${parseInt(form[1].value)}-${parseInt(form[2].value)}-${parseInt(form[3].value)}`);
        const response = await fetch(`${URL_BASE}/presupuestoMaterials`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevo),
        });
        if (response.status !== 200) {
            alerta("Error " + response.status + " al guardar información. Revisa la conexión a internet y la disponibilidad"
             +"de espacio en tu dispositivo de almacenamiento. Si el problema continúa, contacta al soporte técnico.");
            return null;
        }
        const data = await response.json();
        cargarItems(presupuesto);
        return data;
    }else{
        alerta("Seleccione un proyecto para continuar");

    }
}