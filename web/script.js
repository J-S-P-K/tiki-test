
//  Guardo la URL de la API donde se envían los pedidos
const API = "/api/tortas";

//  Variable para guardar el producto seleccionado visualmente
let seleccionado = null;

//  Carrito donde voy guardando lo que el usuario pide
let carrito = [];


//  Selecciono todos los productos y el formulario
const productos = document.querySelectorAll(".producto");
const form = document.querySelector(".formulario");


//  Recorro cada producto para agregarle el evento al botón
productos.forEach(prod => {
  const btn = prod.querySelector(".pedir");

  btn.addEventListener("click", () => {

    //  Quito la selección anterior
    productos.forEach(p => p.classList.remove("activo"));

    //  Marco el producto actual como seleccionado
    prod.classList.add("activo");

    //  Guardo los datos del producto
    seleccionado = {
      nombre: prod.querySelector("h2").innerText,
      precio: parseInt(prod.querySelector(".precio").innerText)
    };

    //  Agrego automáticamente al carrito
    carrito.push(seleccionado);

    //  Muestro el carrito abajo
    mostrar();

    //  Muestro el formulario
    form.classList.remove("oculto");

    //  Completo los datos automáticamente
    document.querySelector(".productoInput").value = seleccionado.nombre;
    document.querySelector(".precioInput").value = "$" + seleccionado.precio;
  });
});


//  Función para mostrar lo que hay en el carrito
function mostrar(){
  let lista = document.getElementById("lista");
  let total = 0;

  if(!lista) return;

  lista.innerHTML = "";

  carrito.forEach(p => {
    lista.innerHTML += `<p>${p.nombre} - $${p.precio}</p>`;
    total += p.precio;
  });

  let totalHTML = document.getElementById("total");
  if(totalHTML){
    totalHTML.innerText = "Total: $" + total;
  }
}


//  Evento para enviar el pedido
document.querySelector(".formulario .enviar").addEventListener("click", async () => {
  const nombre = document.querySelector(".formulario .nombre").value;
  
  const detalles = document.querySelector(".detalles").value;

  //  Validación
  if (!nombre) {
    alert("Ingresá tu nombre");
    return;
  }

  if(carrito.length === 0){
    alert("Seleccioná un producto");
    return;
  }

  //  Envío cada producto a la API
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

  //  Mensaje final
  alert(
    "Pedido enviado:\n" +
    "Cliente: " + nombre +
    "\nProducto: " + carrito.map(p => p.nombre).join(", ") +
    "\nDetalles: " + detalles +
    "\nTotal: $" + carrito.reduce((acc, p) => acc + p.precio, 0)
  );

  //  Limpio todo después de enviar
  carrito = [];
  mostrar();
  await cargar();

  form.classList.add("oculto");
  document.querySelector(".nombre").value = "";
  document.querySelector(".detalles").value = "";

  productos.forEach(p => p.classList.remove("activo"));
});


//  Función para traer los pedidos guardados desde la API
async function cargar(){
  let r = await fetch(API);
  let data = await r.json();

  let d = document.getElementById("datos");
  if(!d) return;

  d.innerHTML = "";

  data.forEach(x => {
    d.innerHTML += `
      <p>
        ${x[1]} - ${x[2]} - ${x[3]} - $${x[4]}
      </p>
    `;
  });
}


//  Se ejecuta cuando carga la página
cargar();
