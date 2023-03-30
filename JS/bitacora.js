function carga(params) {
    const urlParams = new URLSearchParams(window.location.search);
    let queryParam = urlParams.get('idTarea');
    console.log(queryParam);
    cargartareas();
    let a= parseInt(queryParam);
    if (isNaN(a)) {
    cargartarea(queryParam);
    tareasEtapa(queryParam);
    }
}