const URL_IMG = "http://192.168.1.10:8081";
const URL_BASE = "http://192.168.1.10:8084";

const form = document.forms.namedItem("diseño");
form.addEventListener('submit', onSubmitForm, false);

async function onSubmitForm(ev) {
  ev.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const queryParam = urlParams.get('nombreProyecto');

  if (queryParam === "" || queryParam === null) {
    return;
  }

  const diseno = await creatediseno(queryParam);

  if (!diseno) {
    return;
  }

  const archivo = form[3].files[0];
  const oData = new FormData();
  const newDate = form[2].value;

  oData.append("file", archivo);
  oData.append("ubicacion", "img");
  oData.append("nombre", `(${diseno})-${newDate}`);
  oData.append("fecha", newDate);

  let idfoto = await uploadFile(oData);
  let actualizacion =await uploaddiseno(diseno, idfoto);
  direccion("diseno.html");

}

async function uploaddiseno(diseno, idfoto){
  const actuaizacion = await fetch(`${URL_BASE}/disenos/${diseno}/${idfoto}`)
    .then(response => response.json())
    .catch(error => console.log(error));

    return actuaizacion;
}

async function creatediseno(proyecto) {
  const nuevadiseno = {
    "idProyecto":{"id":proyecto},
    "nombreDiseno":form[0].value,
    "areaTerreno":form[1].value,
    "idFoto":2,
    "fecha":form[2].value,
    "idEstado":{"id":2}
    };
  const response = await fetch(`${URL_BASE}/disenos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevadiseno),
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