const URL_BASE = "http://sistemas:8080";
URL_RESPONSABLE = "http://sistemas:8083";


function cargar() {
    const urlParams = new URLSearchParams(window.location.search);
    let queryParam = urlParams.get('nombreProyecto');
    if (queryParam != null && queryParam != "") {
        cargarProyecto(queryParam);
        cargarPresupuesto(queryParam);
    }
}

async function cargarProyecto(id) {
    fetch(`${URL_BASE}/proyectos/${id}`)
        .then(response => response.json())
        .then(data => {
            tablaInfo(data);
            responsable(data.id);
            cargarPresupuestos(data.id);
        })
        .catch(error => console.log(error));
}

async function cargarPresupuesto(proyecto) {

    const response = await fetch(`${URL_BASE}/presupuestos/proyecto/${proyecto}`)
    const data = await response.json();
    const filtro = cargarfiltro(data, proyecto);
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

function tablaInfo(data) {

    const codigo = document.getElementById("codigoProyecto");
    const nombre = document.getElementById("nombreProyecto");
    const tipo = document.getElementById("tipoProyecto");

    codigo.textContent = data.id;
    nombre.textContent = data.nombreProyecto;
    tipo.textContent = data.idTipoProyecto.nombre;
}

async function responsable(proyecto) {

    const responsable = document.getElementById("responsable");

    const response = await fetch(`${URL_BASE}/proyectoPersonas/proyecto/${proyecto}/3`);
    const data = await response.json();

    const idPersonas = data.map(item => item.id.persona);
    const rta = idPersonas.join(", ");
    const nombres = await nombreResponsable(rta);
    responsable.textContent = nombres;

}

async function cargarPresupuestos(proyecto) {
    const codigoPresupueso = document.getElementById("codigoPresupueso");
    const costo = document.getElementById("costo");
    const estado = document.getElementById("estado");

    const response = await fetch(`${URL_BASE}/presupuestos/proyecto/${proyecto}`)
    const data = await response.json();

    const urlParams = new URLSearchParams(window.location.search);
    let presupuesto = urlParams.get('idPresupuesto');
    let a = parseInt(presupuesto);
    if (!isNaN(a)) {
        cargarCosto(data[a].id);
        cargarItems(data[a].id);
        codigoPresupueso.textContent = data[a].id;
        costo.textContent = "$" + data[a].costoTotal.toLocaleString('es-ES', { maximumFractionDigits: 0 });
        estado.textContent = data[a].idEstado.nombreEstado;
    } else {
        if (data.length == 0) {
            alertaPermanente("Lo siento, pero no se puede continuar con el proyecto en este momento, ya que no se"
                + " ha encontrado ningún presupuesto asociado. ");
        }
        else {
            cargarCosto(data[0].id);
            cargarItems(data[0].id);
            codigoPresupueso.textContent = data[0].id;
            costo.textContent = "$" + data[0].costoTotal.toLocaleString('es-ES', { maximumFractionDigits: 0 });
            estado.textContent = data[0].idEstado.nombreEstado;
        }
    }
}

async function cargarCosto(presupuesto) {
    const costo = fetch(`${URL_BASE}/presupuestos/costototal/${presupuesto}`);
}

async function cargarItems(presupuesto) {
    fila("Personal", presupuesto);
    fila("Maquinaria", presupuesto);
    fila("Material", presupuesto);
    fila("Herramienta", presupuesto);
}

async function fila(tipo, presupuesto) {
    const data = await fetchData(tipo, presupuesto);
    updateUI(tipo, data);
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

async function cargoPersonal(id){

    const response = await fetch(`${URL_RESPONSABLE}/cargos/${id}`);
    const data = await response.json();
    return data;
}

//Llenar tablas de materiales y personal presupuestoMterials y presupuestoPersonals
async function updateUI(tipo, data) {
    const tabla = document.getElementById(`${tipo}table`);
    tabla.innerHTML = "";

    const boton = document.getElementById(`button${tipo}`);
    boton.disabled = (data.length === 0);
    boton.setAttribute("class", `accordion-button ${boton.disabled ? "collapsed" : ""} btn btn-outline-secondary`);

    for (const material of data) {
        const row = document.createElement("tr");

        const cell1 = document.createElement("td");
        cell1.textContent = tipo === "Personal" ? material.id.idPersonal : material.idMaterial.id;

        const cell2 = document.createElement("td");
        if(tipo === "Personal"){
            let  cargo = await cargoPersonal(material.id.idPersonal);
            cell2.textContent = cargo.nombre;
        }
        else{
            cell2.textContent =material.idMaterial.idProducto;
        }

        const cell3 = document.createElement("td");
        cell3.textContent = material.cantidad;

        const cell4 = document.createElement("td");
        cell4.textContent = material.costo == null ? "$0" : "$" + material.costo.toLocaleString();

        const cell5 = document.createElement("td");
        cell5.textContent = material.tiempoUso;

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        let costo = material.cantidad * material.costo * material.tiempoUso || 0;
        if (tipo != "Material" && tipo != "Herramienta") {
            row.appendChild(cell5);
            costo = material.cantidad * material.costo;
        }

        tabla.appendChild(row);
    }
}

async function agregar() {
    let presupuesto = document.getElementById("codigoPresupueso");
    let a = parseInt(presupuesto.textContent);
    if (!isNaN(a)) {
        const form = document.getElementById("agregarPresupuesto");
        const tipo = form.getAttribute('data-id');

        if (tipo === "Personal") {
            const response = await agregarPersonal(a);
        } else {
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

            let response = await fetch(`${URL_BASE}/presupuestoMaterials`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevo),
            });
        }

        //const data = await response.json();
        cargarItems(presupuesto);
        location.reload();
        
        //return data;
    } else {
        alerta("Seleccione un proyecto para continuar");

    }
}

async function agregarPersonal(a) {

    const form = document.getElementById("agregarPresupuesto");

    let nuevo = {
        "id": {
            "idPresupuesto": a,
            "idPersonal": parseInt(form[0].value)
        },
        "idPresupuesto": { "id": a },
        "idPersonal": { "id": parseInt(form[0].value) },
        "cantidad": parseInt(form[2].value),
        "costo": parseInt(form[1].value),
        "tiempoUso": parseInt(form[3].value)
    }

    const response = await fetch(`${URL_BASE}/presupuestoPersonals`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevo),
    });
    if (response.status !== 200) {
        alerta("Error " + response.status + " al guardar información. Revisa la conexión a internet y la disponibilidad"
            + "de espacio en tu dispositivo de almacenamiento. Si el problema continúa, contacta al soporte técnico.");
        return null;
    }
    return response;

}

async function crearPresupuesto() {

    const urlParams = new URLSearchParams(window.location.search);
    let proyecto = urlParams.get('nombreProyecto');
    if (proyecto != null && proyecto != "") {

        let nuevo = {
            "idProyecto": { "id": parseInt(proyecto) },
            "costoTotal": 0,
            "idEstado": { "id": 2 }
        }

        let response = await fetch(`${URL_BASE}/presupuestos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevo),
        });
        if (response.status !== 200) {
            response = agregarPersonal(a);
        }
        const data = await response.json();
        cargarItems(presupuesto);

        return data;
    } else {
        alerta("Seleccione un proyecto para continuar");

    }
}

async function personalMaterial(tipo) {
    if (tipo === "Personal") {
        const response = await fetch(`${URL_RESPONSABLE}/cargos`);
        return await response.json();
    } else {
        const response = await fetch(`${URL_BASE}/materials/tipo/${tipo}`);
        return await response.json();
    }
}

//cargar desplegable del formulario con los personales 
async function editarPresupuesto(tipo) {

    const form3 = document.getElementById("tiempo");
    const form = document.getElementById("agregarPresupuesto");

    const data = await personalMaterial(tipo);
    form.setAttribute("data-id", tipo)
    form[0].innerHTML = "";
    for (let i in data) {

        const cell = document.createElement("option");
        if (tipo === "Personal") {
            cell.text = data[i].nombre;
        }
        else {
            cell.text = data[i].idProducto;
        }
        cell.value = data[i].id;

        form[0].add(cell);
    }

    if (tipo === "Herramienta" || tipo === "Material") {
        form3.classList.add("class", "visually-hidden");
    } else {
        form3.setAttribute("class", "form-outline mb-4");
    }

}

//filro de desplegable de presupuestos del proyecto selecionado
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