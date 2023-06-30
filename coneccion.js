window.addEventListener('load', () => {
  // Array para almacenar los productos seleccionados
  let carrito = [];

  // Función para actualizar el carrito en la interfaz
  function actualizarCarrito() {
    const carritoHTML = document.getElementById('carrito');
    const definitivaHTML = document.getElementById('definitiva');

    // Limpiar el contenido del carrito y definitivaHTML
    carritoHTML.innerHTML = '';
    definitivaHTML.innerHTML = '';

    let total = 0;

    carrito.forEach((producto) => {
      const { nombre, precio, cantidad } = producto;
      const subtotal = precio * cantidad;
      total += subtotal;

      // Crear la nueva card del producto en el carrito
      const productoCard = document.createElement('div');
      productoCard.classList.add('card', 'mt-4');
      productoCard.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${nombre}</h5>
          <p class="card-text">Precio: $${precio}</p>
          <p class="card-text">Cantidad: ${cantidad}</p>
          <p class="card-text">Subtotal: $${subtotal}</p>
        </div>
      `;

      // Agregar la card del producto al carrito
      carritoHTML.appendChild(productoCard);
    });

    // Mostrar el total y el botón de compra
    const definitivaCard = document.createElement('div');
    definitivaCard.classList.add('card', 'mt-4');
    definitivaCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">Total a pagar</h5>
        <p class="card-text">Total: $${total}</p>
        <button id="comprarBtn" type="button" class="btn btn-primary">Comprar</button>
      </div>
    `;

    definitivaHTML.appendChild(definitivaCard);
  }

  fetch('https://g9cd7530b8a8613-ecommerce.adb.sa-santiago-1.oraclecloudapps.com/ords/inacap_ecommerce/mcdonalds3/')
    .then((resultado) => resultado.json())
    .then((datos) => {
      console.log(datos);
      for (let i in datos.items) {
        console.log(datos.items[i]);
        let imagenURL = `${datos.items[i].imagen}`; // Ruta de la imagen en el servidor

        // Crear la nueva card del producto
        const productoCard = document.createElement('div');
        productoCard.classList.add('col');
        productoCard.innerHTML = `
          <div class="card" style="width: 18rem;">
            <img src="${imagenURL}" class="card-img-top" alt="...">
            <div class="card-body">
              <ul>
                <li><strong>Nombre</strong>: ${datos.items[i].nombre}</li>
                <li><strong>Descripcion</strong>: ${datos.items[i].descripcion}</li>
                <li><strong>Precio $</strong>: ${datos.items[i].precio}</li>
              </ul>
              <div class="card-footer">
                <button data-producto="${datos.items[i].nombre}" data-precio="${datos.items[i].precio}" type="button" class="btn btn-success agregar-carrito justify-content-start">Añadir</button>
                <button type="button" class="btn btn-danger justify-content-end">Quitar</button>
              </div>
            </div>
          </div>
        `;

        // Agregar el evento de click al botón "Añadir"
        const agregarCarritoBtn = productoCard.querySelector('.agregar-carrito');
        agregarCarritoBtn.addEventListener('click', () => {
          const nombre = agregarCarritoBtn.getAttribute('data-producto');
          const precio = parseFloat(agregarCarritoBtn.getAttribute('data-precio'));

          // Verificar si el producto ya está en el carrito
          const productoExistente = carrito.find((producto) => producto.nombre === nombre);
          if (productoExistente) {
            // Incrementar la cantidad si el producto ya está en el carrito
            productoExistente.cantidad++;
          } else {
            // Agregar el producto al carrito
            carrito.push({
              nombre,
              precio,
              cantidad: 1,
            });
          }

          // Actualizar el carrito en la interfaz
          actualizarCarrito();
        });

        // Agregar la card del producto a la sección de productos
        document.getElementById('productos1').appendChild(productoCard);
      }
    })
    .catch(() => {});

  function comprar() {
    const comprarBtn = document.getElementById('comprarBtn');
    comprarBtn.addEventListener('click', () => {
      if (carrito.length === 0) {
        alert('Debe agregar productos al carrito');
        return;
      }

      let total = 0;
      carrito.forEach((producto) => {
        const { precio, cantidad } = producto;
        total += precio * cantidad;
      });

      alert(`Total a pagar: $${total}`);
    });
  }

  comprar();
});





  // window.addEventListener('load', () => {
//     fetch('https://g9cd7530b8a8613-ecommerce.adb.sa-santiago-1.oraclecloudapps.com/ords/inacap_ecommerce/mcdonalds3/')
//       .then((resultado) => {
//         return resultado.json();
//       })
//       .then((datos) => {
//         console.log(datos);
//         for (let i in datos.items) {
//           console.log(datos.items[i]);
//           let imagenURL = `${datos.items[i].imagen}`; // Ruta de la imagen en el servidor
//           document.getElementById('productos1').innerHTML += `
//             <div class="col">
//               <div class="card" style="width: 18rem;">
//                 <img src="${imagenURL}" class="card-img-top" alt="...">
//                 <div class="card-body">
//                   <ul>
//                     <li><strong>Nombre</strong>: ${datos.items[i].nombre}</li>
//                     <li><strong>Descripcion</strong>: ${datos.items[i].descripcion}</li>
//                     <li><strong>Precio $</strong>: ${datos.items[i].precio}</li>
//                   </ul>
//                   <div class="card-footer ">
//                     <button id="shop" type="button" class="btn btn-success justify-content-start">Añadir</button>
//                     <button id="delete" type="button" class="btn btn-danger justify-content-end">Quitar</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           `;
//         }
//       })
//       .catch(() => {});
//   });

