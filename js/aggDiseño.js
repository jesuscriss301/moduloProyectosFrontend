const formDiseño =(event) => {
    event.preventDefault();
const datos =new FormData(event.target);
console.log(datos);

const datosCompletos = Object.fromEntries(datos.entries());

console.log(datosCompletos);
}    