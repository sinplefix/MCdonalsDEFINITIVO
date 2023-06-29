window.addEventListener('load', () => {
    fetch('https://g9cd7530b8a8613-ecommerce.adb.sa-santiago-1.oraclecloudapps.com/ords/inacap_ecommerce/mcdonalds3/')
      .then((resultado) => {
        return resultado.json();
      })
      .then((datos) => {
        console.log(datos);
        for (let i in datos.items) {
          console.log(datos.items[i]);
          let imagenURL = `${datos.items[i].imagen}`; // Ruta de la imagen en el servidor
          document.getElementById('productos1').innerHTML += `
            <div class="col">
              <div class="card" style="width: 18rem;">
                <img src="${imagenURL}" class="card-img-top" alt="...">
                <div class="card-body">
                  <ul>
                    <strong>ID</strong>: ${datos.items[i].id}
                    <li><strong>Nombre</strong>: ${datos.items[i].nombre}</li>
                    <li><strong>Descripcion</strong>: ${datos.items[i].descripcion}</li>
                    <li><strong>Precio $</strong>: ${datos.items[i].precio}</li> <!-- ETIQUETA OFICIAL --> 
                  </ul>
                  <div class="card-footer ">
                    <a href="#" class="btn btn-success justify-content-start">Añadir</a>
                    <a href="#" class="btn btn-danger justify-content-end">Quitar</a>
                  </div>
                </div>
              </div>
            </div>
          `;
        }
      })
      .catch(() => {});
  });

  window.addEventListener('click')
  