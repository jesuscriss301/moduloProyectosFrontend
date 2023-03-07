function hornos() {
    CantHorno11();
    CantHorno22();
}


function CantHorno11() {
var numPartes = 11;
var partesHorno = document.getElementById("partes-horno11");
              
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


function CantHorno22() {
    var numPartes = 22;
    var partesHorno = document.getElementById("partes-horno22");
                  
    for (var i = 12; i <= numPartes; i++) {
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
    
