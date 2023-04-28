const URL_IMG = "http://192.168.1.10:8081";
const URL_BASE = "http://192.168.1.10:8084";

const form = document.forms.namedItem("agregarBitacora");
form.addEventListener('submit', onSubmitForm, false);

async function onSubmitForm(ev) {
  ev.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const queryParam = urlParams.get('nombreProyecto');
  const queryParamTarea = urlParams.get('idTarea');
  const queryParamBitacora = urlParams.get('idbitacora');

  if (queryParam === "" || queryParam === null) {
    return;
  }
  if (queryParamBitacora != "" && queryParamBitacora != null) {
    const form = document.getElementById("agregarBitacora");
    const response = await fetch(`${URL_BASE}/bitacoras/${queryParamBitacora}`);
    const data = await response.json();
    const date = new Date(form[1].value);
    date.setHours(date.getHours() - 5);
    const nuevaBitacora = {
      "id": data.id,
      "idTarea": { "id": data.idTarea.id },
      "descripcionBitacora": form[0].value,
      "observacionBitacora": form[2].value === "" ? null : form[2].value,
      "fechaHora": date.toISOString(),
      "fileFoto": data.fileFoto
    };
    const guardarCabios = await fetch(`${URL_BASE}/bitacoras/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaBitacora),
    });
    const bitacora = await guardarCabios.json();

    if (guardarCabios.status !== 200) {
      alerta("Error " + guardarCabios.status + " al guardar información. Revisa la conexión a internet y la disponibilidad de espacio en tu dispositivo de almacenamiento. Si el problema continúa, contacta al soporte técnico.");
      return null;
    }
    
    if (!bitacora) {
      return;
    }

    const archivo = form[3].files[0];
      if (archivo != null) {
    const oData = new FormData();
    const newDate = new Date(form[1].value).toLocaleDateString("en-CA");

    oData.append("file", archivo);
    oData.append("ubicacion", "img");
    oData.append("nombre", `(${bitacora})${newDate}`);
    oData.append("fecha", newDate);

    let idfoto = await uploadFile(oData);
    let actualizacion = await uploadBitacora(bitacora, idfoto);
  }
    direccionbitacoras("bitacora.html")
  }
}

async function cargarinfo() {
  const urlParams = new URLSearchParams(window.location.search);
  const queryParamBitacora = urlParams.get('idbitacora');

  if (queryParamBitacora != "" && queryParamBitacora != null) {

    const form = document.getElementById("agregarBitacora");
    const response = await fetch(`${URL_BASE}/bitacoras/${queryParamBitacora}`);
    const bitacora = await response.json();
    form[0].value = bitacora.descripcionBitacora;
    let date =new Date(bitacora.fechaHora);
    form[1].value = date.toISOString().slice(0,16);
    form[2].value = bitacora.observacionBitacora;
    const img = document.getElementById("imagenBitacora");
    img.setAttribute("src", `${URL_IMG}/files/view/${bitacora.fileFoto}`);

  }
}

async function uploadBitacora(bitacora, idfoto){
  const actuaizacion = await fetch(`${URL_BASE}/bitacoras/${bitacora}/${idfoto}`)
    .then(response => response.json())
    .catch(error => console.log(error));

    return actuaizacion;
}

async function uploadFile(oData) {
  return new Promise((resolve, reject) => {
    const oReq = new XMLHttpRequest();
    oReq.open("POST", `${URL_IMG}/api/files`, true);
    oReq.onload = function(oEvent) {
      if (oReq.status == 200) {
        resolve(oReq.responseText);
      } else {
        alerta("Error " + oReq.status + " no se pudo guardar el archivo. Es posible que la aplicación no tenga permisos suficientes o que el archivo esté en uso.");
      }
    };
    oReq.send(oData);
  });
}