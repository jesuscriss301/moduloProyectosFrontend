const URL_IMG = "http://sistemas:8081";
const URL_BASE = "http://sistemas:8080";

const form = document.forms.namedItem("agregarBitacora");
form.addEventListener('submit', onSubmitForm, false);

async function onSubmitForm(ev) {
  ev.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const queryParam = urlParams.get('nombreProyecto');
  const queryParamTarea = urlParams.get('idTarea');
  const queryParamBitacora = urlParams.get('idBitacora');

  if (queryParam === "" || queryParam === null ) {
    return;
  }

  if (queryParamBitacora!="" && queryParamBitacora!=null) {
    cargarinfo(queryParamBitacora);
  }

  const bitacora = await createBitacora(queryParamTarea);

  if (!bitacora) {
    return;
  }

  const archivo = form[3].files[0];
  const oData = new FormData();
  const newDate = new Date(form[1].value).toLocaleDateString("en-CA");

  oData.append("file", archivo);
  oData.append("ubicacion", "img");
  oData.append("nombre", `(${bitacora})${newDate}`);
  oData.append("fecha", newDate);

  let idfoto = await uploadFile(oData);
  let actualizacion =await uploadBitacora(bitacora, idfoto);
  direccionbitacoras("bitacora.html")

}

async function cargarinfo(params) {
    const form = document.getElementById("agregarBitacora");
    const response =  await fetch(`${URL_BASE}/bitacoras/${id}`);
    const bitacora = response.json();
    form[0].value = bitacora.descripcionBitacora;
    form[1].value = bitacora.fechaHora;
    form[2].value = bitacora.observacionBitacora;
    const img = form.getElementById("imagenBitacora");
    img.setAttribute("src", `${URL_IMG}/files/view/${bitacora.fileFoto}`);
}

async function uploadBitacora(bitacora, idfoto){
  const actuaizacion = await fetch(`${URL_BASE}/bitacoras/${bitacora}/${idfoto}`)
    .then(response => response.json())
    .catch(error => console.log(error));

    return actuaizacion;
}

async function createBitacora(queryParamTarea) {
  const nuevaBitacora = {
    "idTarea": {"id": parseInt(queryParamTarea)},
    "descripcionBitacora": form[0].value,
    "observacionBitacora": form[2].value,
    "fechaHora": new Date(form[1].value).toISOString(),
    "fileFoto": 4
  };
  const response = await fetch(`${URL_BASE}/bitacoras`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaBitacora),
  });

  if (response.status !== 200) {
    alerta("Error " + response.status + " al guardar información. Revisa la conexión a internet y la disponibilidad de espacio en tu dispositivo de almacenamiento. Si el problema continúa, contacta al soporte técnico.");
    return null;
  }

  const data = await response.json();
  return data;
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