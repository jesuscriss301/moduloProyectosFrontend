BASE_IMG = "http://localhost:8081";

const guardarImage = async (form)=>{

  form.addEventListener('submit', function(ev) {

    var oOutput = document.getElementById("output"),
    oData = new FormData(document.forms.namedItem("agregarBitacora"));

    oData.append("ubicacion", "img");

    var oReq = new XMLHttpRequest();
    oReq.open("POST", `${BASE_IMG}/api/files`, true);
    oReq.onload = function(oEvent) {
        if (oReq.status != 200)  {
            oOutput.innerHTML = "Error " + oReq.status + " occurred uploading your file.<br \/>";
        }
    };

    oReq.send(oData);
    ev.preventDefault();
  }, false);
}

const addProyecto = async () => {
    const form = document.querySelector("#agregarBitacor");  
  
    const nuevoProyecto = await guardarImage(form);
  
    location.href ="proyectos.html";
    
    // Hacer alguna acción adicional (por ejemplo, redireccionar a otra página)
  };