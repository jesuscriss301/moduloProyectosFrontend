function hornos() {
    CantHorno();
}


function CantHorno() {
var numPartes = 22;
var partesHorno = document.getElementById("partes-horno");
              
for (var i = 1; i <= numPartes; i++) {
var checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.name = "parte-horno-" + i;
checkbox.value = "parte-horno-" + i;
              
var label = document.createElement("label");
label.appendChild(checkbox);
label.appendChild(document.createTextNode("Parte " + i));
              
var br = document.createElement("br");
              
partesHorno.appendChild(label);
partesHorno.appendChild(br);
}}
