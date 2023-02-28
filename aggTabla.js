function cargarTabla() {
    Tabla();
}

function Tabla() {
  
google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);

function drawTable() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Codigo');
  data.addColumn('string', 'Nombre');
  data.addColumn('string', 'Responsable');
  data.addColumn('string', 'Etapa');
  data.addColumn('string', 'Avance');
  data.addRows([
    ['BO1H01','Reparacion','Argenis Florez','Presupuesto','0 %' ],
    ['BO1H02','Reparacion','Argenis Florez','Presupuesto','0 %' ],
    ['BO1H03','Reparacion','Argenis Florez','Presupuesto','0 %' ],
    ['BO1H04','Reparacion','Argenis Florez','Presupuesto','0 %' ],
    ['BO1H05','Reparacion','Argenis Florez','Presupuesto','0 %' ]
  ]);

  var table = new google.visualization.Table(document.getElementById('table_div'));

  table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
}}
 
 
 
 
 
 
