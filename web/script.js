const API = "/api/tortas";

let carrito = [];

function agregar(nombre, precio){
  carrito.push({nombre, precio});
  mostrar();
}

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

async function enviar(){

  let nombre = document.getElementById("nombre").value;
  let detalles = document.getElementById("detalles").value;

  if(carrito.length === 0) return;

  for (const p of carrito) {
    await fetch(API, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        nombre: nombre,
        producto: p.nombre,
        detalles: detalles,
        precio: p.precio
      })
    });
  }

  carrito = [];
  mostrar();
  await cargar();

  document.getElementById("nombre").value = "";
  document.getElementById("detalles").value = "";

  alert("Pedido enviado");
}

async function cargar(){
  let r = await fetch(API);
  let data = await r.json();

  let d = document.getElementById("datos");
  d.innerHTML = "";

  data.forEach(x => {
    d.innerHTML += `
      <p>
        ${x[1]} - ${x[2]} - ${x[3]} - $${x[4]}
      </p>
    `;
  });
}

cargar();