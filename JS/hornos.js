function CargarHornos() {
    Tabla();
    Tabla2();
    tabla3();
    Tabla4();
    Tabla5();
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
    ['01','28-02-2023','28-02-23','22'],
    ['02','28-02-2023','28-02-23','21'],
    ['03','28-02-2023','28-02-23','20'],
    ['04','28-02-2023','28-02-23','19'],
    ['05','28-02-2023','28-02-23','18'],
    ['06','28-02-2023','28-02-23','17'],
    ['07','28-02-2023','28-02-23','16'],
    ['08','28-02-2023','28-02-23','15'],
    ['09','28-02-2023','28-02-23','14'],
    ['10','28-02-2023','28-02-23','13'],
    ['11','28-02-2023','28-02-23','12'],

  ]);

  var table = new google.visualization.Table(document.getElementById('Tabla'));

  table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});
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
        ['02','28-02-2023','28-02-2023','21'],
        ['03','28-02-2023','28-02-2023','20'],
        ['04','28-02-2023','28-02-2023','19'],
        ['05','28-02-2023','28-02-2023','18'],
        ['06','28-02-2023','28-02-2023','17'],
        ['07','28-02-2023','28-02-2023','16'],
        ['08','28-02-2023','28-02-2023','15'],
        ['09','28-02-2023','28-02-2023','14'],
        ['10','28-02-2023','28-02-2023','13'],
        ['11','28-02-2023','28-02-2023','12'],
    
      ]);
    
      var table = new google.visualization.Table(document.getElementById('Tabla2'));
    
      table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});
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
            ['02','28-02-2023','28-02-2023','21'],
            ['03','28-02-2023','28-02-2023','20'],
            ['04','28-02-2023','28-02-2023','19'],
            ['05','28-02-2023','28-02-2023','18'],
            ['06','28-02-2023','28-02-2023','17'],
            ['07','28-02-2023','28-02-2023','16'],
            ['08','28-02-2023','28-02-2023','15'],
            ['09','28-02-2023','28-02-2023','14'],
            ['10','28-02-2023','28-02-2023','13'],
            ['11','28-02-2023','28-02-2023','12'],
        
          ]);
        
          var table = new google.visualization.Table(document.getElementById('Tabla3'));
        
          table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});
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
            ['02','28-02-2023','28-02-2023','21'],
            ['03','28-02-2023','28-02-2023','20'],
            ['04','28-02-2023','28-02-2023','19'],
            ['05','28-02-2023','28-02-2023','18'],
            ['06','28-02-2023','28-02-2023','17'],
            ['07','28-02-2023','28-02-2023','16'],
            ['08','28-02-2023','28-02-2023','15'],
            ['09','28-02-2023','28-02-2023','14'],
            ['10','28-02-2023','28-02-2023','13'],
            ['11','28-02-2023','28-02-2023','12'],
        
          ]);
        
          var table = new google.visualization.Table(document.getElementById('Tabla4'));
        
          table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});
    }}
         
function Tabla5() {
  
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
                ['02','28-02-2023','28-02-2023','21'],
                ['03','28-02-2023','28-02-2023','20'],
                ['04','28-02-2023','28-02-2023','19'],
                ['05','28-02-2023','28-02-2023','18'],
                ['06','28-02-2023','28-02-2023','17'],
                ['07','28-02-2023','28-02-2023','16'],
                ['08','28-02-2023','28-02-2023','15'],
                ['09','28-02-2023','28-02-2023','14'],
                ['10','28-02-2023','28-02-2023','13'],
                ['11','28-02-2023','28-02-2023','12'],
            
              ]);
            
              var table = new google.visualization.Table(document.getElementById('Tabla5'));
            
              table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});
    }}
    
 
 
 
