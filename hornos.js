function CargarHornos() {
    Tabla();
    Tabla2();
    tabla3();
    Tabla4();
}

function Tabla() {
  
google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);

function drawTable() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Codigo');
  data.addColumn('string', 'Fecha');
  data.addColumn('string', 'Fecha');
  data.addColumn('string', 'Codigo');
  data.addRows([
    ['01','28-02-2023','28-02-2023','22'],
    ['02','28-02-2023','28-02-2023','22'],
    ['03','28-02-2023','28-02-2023','22'],
    ['04','28-02-2023','28-02-2023','22'],
    ['05','28-02-2023','28-02-2023','22'],
    ['06','28-02-2023','28-02-2023','22'],
    ['07','28-02-2023','28-02-2023','22'],
    ['08','28-02-2023','28-02-2023','22'],
    ['09','28-02-2023','28-02-2023','22'],
    ['10','28-02-2023','28-02-2023','22'],
    ['11','28-02-2023','28-02-2023','22'],

  ]);

  var table = new google.visualization.Table(document.getElementById('Tabla'));

  table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
}}
 
 
function Tabla2() {
  
    google.charts.load('current', {'packages':['table']});
    google.charts.setOnLoadCallback(drawTable);
    
    function drawTable() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Codigo');
      data.addColumn('string', 'Fecha');
      data.addColumn('string', 'Fecha');
      data.addColumn('string', 'Codigo');
      data.addRows([
        ['01','28-02-2023','28-02-2023','22'],
        ['02','28-02-2023','28-02-2023','22'],
        ['03','28-02-2023','28-02-2023','22'],
        ['04','28-02-2023','28-02-2023','22'],
        ['05','28-02-2023','28-02-2023','22'],
        ['06','28-02-2023','28-02-2023','22'],
        ['07','28-02-2023','28-02-2023','22'],
        ['08','28-02-2023','28-02-2023','22'],
        ['09','28-02-2023','28-02-2023','22'],
        ['10','28-02-2023','28-02-2023','22'],
        ['11','28-02-2023','28-02-2023','22'],
    
      ]);
    
      var table = new google.visualization.Table(document.getElementById('Tabla2'));
    
      table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
    }}
     
function tabla3() {
  
        google.charts.load('current', {'packages':['table']});
        google.charts.setOnLoadCallback(drawTable);
        
    function drawTable() {
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'Codigo');
          data.addColumn('string', 'Fecha');
          data.addColumn('string', 'Fecha');
          data.addColumn('string', 'Codigo');
          data.addRows([
            ['01','28-02-2023','28-02-2023','22'],
            ['02','28-02-2023','28-02-2023','22'],
            ['03','28-02-2023','28-02-2023','22'],
            ['04','28-02-2023','28-02-2023','22'],
            ['05','28-02-2023','28-02-2023','22'],
            ['06','28-02-2023','28-02-2023','22'],
            ['07','28-02-2023','28-02-2023','22'],
            ['08','28-02-2023','28-02-2023','22'],
            ['09','28-02-2023','28-02-2023','22'],
            ['10','28-02-2023','28-02-2023','22'],
            ['11','28-02-2023','28-02-2023','22'],
        
          ]);
        
          var table = new google.visualization.Table(document.getElementById('Tabla3'));
        
          table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
    }}
     
function Tabla4() {
  
    google.charts.load('current', {'packages':['table']});
    google.charts.setOnLoadCallback(drawTable);
        
function drawTable() {
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'Codigo');
          data.addColumn('string', 'Fecha');
          data.addColumn('string', 'Fecha');
          data.addColumn('string', 'Codigo');
          data.addRows([
            ['01','28-02-2023','28-02-2023','22'],
            ['02','28-02-2023','28-02-2023','22'],
            ['03','28-02-2023','28-02-2023','22'],
            ['04','28-02-2023','28-02-2023','22'],
            ['05','28-02-2023','28-02-2023','22'],
            ['06','28-02-2023','28-02-2023','22'],
            ['07','28-02-2023','28-02-2023','22'],
            ['08','28-02-2023','28-02-2023','22'],
            ['09','28-02-2023','28-02-2023','22'],
            ['10','28-02-2023','28-02-2023','22'],
            ['11','28-02-2023','28-02-2023','22'],
        
          ]);
        
          var table = new google.visualization.Table(document.getElementById('Tabla4'));
        
          table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
    }}
         
     
     
     
    
 
 
 
