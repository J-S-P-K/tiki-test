const API = "/api/tortas";

// Cargo pedidos al abrir la página
async function cargarPedidos(){

  let contenedor = document.getElementById("listaPedidos");

  try {
    let r = await fetch(API);
    let data = await r.json();

    //  más nuevos primero
    data.reverse();

    contenedor.innerHTML = "";

    data.forEach(x => {
      contenedor.innerHTML += `
        <div class="pedido">
          <p><b>Cliente:</b> ${x[1]}</p>
          <p><b>Producto:</b> ${x[2]}</p>
          <p><b>Detalles:</b> ${x[3]}</p>
          <p><b>Precio:</b> $${x[4]}</p>
        </div>
      `;
    });

  } catch (error) {
    contenedor.innerHTML = "<p>Error al cargar pedidos</p>";
    console.log(error);
 
}

//  ejecutar
}
cargarPedidos();
