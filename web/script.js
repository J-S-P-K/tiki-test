const API = "http://localhost:5000/tortas";

let carrito = [];

// AGREGAR PRODUCTO
function agregar(nombre, precio){
  carrito.push({nombre, precio});
  mostrar();
}

// MOSTRAR CARRITO
function mostrar(){
  let lista = document.getElementById("lista");
  let total = 0;

  lista.innerHTML = "";

  carrito.forEach(p => {
    lista.innerHTML += `<p>${p.nombre} - $${p.precio}</p>`;
    total += p.precio;
  });

  document.getElementById("total").innerText = "Total: $" + total;
}

// ENVIAR A API
function enviar(){

  let nombre = document.getElementById("nombre").value;
  let detalles = document.getElementById("detalles").value;

  carrito.forEach(p => {
    fetch(API, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        nombre: nombre,
        producto: p.nombre,
        detalles: detalles,
        precio: p.precio
      })
    });
  });

  carrito = [];
  mostrar();
  cargar();

  alert("Pedido enviado");
}

// CARGAR DATOS
function cargar(){
  fetch(API)
    .then(r => r.json())
    .then(data => {

      let d = document.getElementById("datos");
      d.innerHTML = "";

      data.forEach(x => {
        d.innerHTML += `
          <p>
            ${x[1]} - ${x[2]} - ${x[3]} - $${x[4]}
          </p>
        `;
      });

    });
}

// CARGAR AL INICIO
cargar();