const URL_IMG = "http://sistemas:8081";
const URL_BASE = "http://sistemas:8080"
var form = document.forms.namedItem("agregarBitacora");
form.addEventListener('submit',async function(ev) {

  const urlParams = new URLSearchParams(window.location.search);
  const queryParam = urlParams.get('nombreProyecto');
  const queryParamTarea = urlParams.get('idTarea');

  const bitacora =await bitacora(queryParamTarea);

  let archivo = form[3].files[0];
  oData = new FormData();

  if (queryParam!="" && queryParam!=null){ 
  
  var newDate = new Date(form[1].value).toLocaleDateString("en-CA");

  oData.append("file", archivo);
  oData.append("ubicacion", "img");
  oData.append("nombre", `(${bitacora.id})${newDate.getFullYear()}${newDate.getMonth()}${newDate}`);
  oData.append("fecha", newDate);

  var oReq = new XMLHttpRequest();
  oReq.open("POST",`${URL_IMG}/api/files`, true);
  oReq.onload = function(oEvent) {
    if (oReq.status == 200) {
      console.log(oReq.responseText);
    } else {
      alerta("Error " + oReq.status + " occurred uploading your file.");
    }
  };
  
  oReq.send(oData);
  ev.preventDefault();
}
}, false);

const bitacora = async (queryParamTarea) => {
    
  let nuevaBitacora = {
    "idTarea":{"id":parseInt(queryParamTarea)},
    "descripcionBitacora":form[0].value,
    "observacionBitacora":form[2].value,
    "fechaHora": new Date(form[1].value).toISOString().slice(0, 19).replace("T", " "),
    "fileFoto":4
  }

  const response = await fetch(`${URL_BASE}/bitacoras`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaBitacora),
  });
  const data = await response.json();
  return data;
}
