const URL_IMG = "http://sistemas:8081";
var form = document.forms.namedItem("agregarBitacora");
form.addEventListener('submit', function(ev) {

  let archivo = form[3].files[0];
  var oOutput = document.getElementById("output"),
  oData = new FormData();
  
  var newDate = new Date(form[1].value).toLocaleDateString("en-CA");

  oData.append("file", archivo);
  oData.append("ubicacion", "img");
  oData.append("nombre", "Proyectos-Minero");
  oData.append("fecha", newDate);

  var oReq = new XMLHttpRequest();
  oReq.open("POST",`${URL_IMG}/api/files`, true);
  oReq.onload = function(oEvent) {
    if (oReq.status == 200) {
      oOutput.innerHTML = "cargo con exito";
    } else {
      oOutput.innerHTML = "Error " + oReq.status + " occurred uploading your file.<br \/>";
    }
  };

  oReq.send(oData);
  ev.preventDefault();
}, false);