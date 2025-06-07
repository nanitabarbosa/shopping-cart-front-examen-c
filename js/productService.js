function products() {
    document.getElementById('cardHeader').innerHTML = '<h5>Listado de productos</h5>';
    const ENDPOINT = 'https://dummyjson.com/products';

    fetch(ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(response => {
            console.log(response);
            return response.json().then(data => {
                return {
                    status: response.status,
                    info: data
                };
            });
        })
        .then(result => {
            if (result.status === 200 && Array.isArray(result.info.products)) {
                let list_products = `<table class="table">
                <button type="button" class="btn btn-outline-success" onclick="addProduct()">Agregar producto</button>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
            `;

                result.info.products.forEach(product => {
                    list_products += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.title}</td>
                        <td>${product.brand}</td>
                        <td>$${product.price}</td>
                        <td><button type="button" class="btn btn-outline-info" onclick="getProduct('${product.id}')">Ver</button></td>
                    </tr>
                `;
                });

                list_products += `
                </tbody>
            </table>`;

                document.getElementById('info').innerHTML = list_products;
            } else {
                document.getElementById('info').innerHTML = 'No existen productos';
            }
        });
}

function getProduct(idProduct) {
    const ENDPOINT = 'https://dummyjson.com/products/' + idProduct;

    fetch(ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    })
        .then(result => {
            return result.json().then(data => {
                return {
                    status: result.status,
                    body: data
                };
            });
        })
        .then(response => {
            if (response.status === 200) {
                const product = response.body;
                console.log("Producto encontrado:", product);

                const modalProduct = `
                <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Ver producto</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="card text-center">
                                    <img src="${product.thumbnail}" class="img-fluid mx-auto" style="width: 150px; height: auto;" alt="Imagen del producto">
                                    <div class="card-body">
                                        <h5 class="card-title">${product.title}</h5>
                                        <p class="card-text">${product.description}</p>
                                        <p class="card-text">Marca: ${product.brand}</p>
                                        <p class="card-text">Precio: $${product.price}</p>
                                        <p class="card-text">Stock: ${product.stock}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

                document.getElementById('viewModal').innerHTML = modalProduct;

                const modal = new bootstrap.Modal(document.getElementById('modalProduct'));
                modal.show();
            } else {
                document.getElementById('info').innerHTML = '<h3>No se encontró el producto en la API</h3>';
            }
        });
}

function addProduct() {
    const modalUser = `
    <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content border-0 shadow-sm" style="width: 400px">

          <div class="modal-header bg-light">
            <h1 class="modal-title fs-5 fw-bold text-primary" id="exampleModalLabel"  style="background-color: #C35C94; -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: transparent;">
              <i class="fa-solid fa-user-plus me-2"></i>Agregar Producto
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>

          <div class="modal-body p-3">
            <form id="formaddProduct">
             <div class="mb-2">
                <label for="id" class="form-label text-capitalize">Id del producto</label>
                <input type="text" class="form-control form-control-sm" id="id" required placeholder="Id del producto">
              </div>
              <div class="mb-2">
                <label for="title" class="form-label text-capitalize">Título</label>
                <input type="text" class="form-control form-control-sm" id="title" required placeholder="Título del producto">
              </div>
              <div class="mb-2">
                <label for="price" class="form-label text-capitalize">Precio</label>
                <input type="number" class="form-control form-control-sm" id="price" required placeholder="Precio en USD">
              </div>
              <div class="mb-2">
                <label for="description" class="form-label text-capitalize">Descripción</label>
                <input type="text" class="form-control form-control-sm" id="description" required placeholder="Breve descripción">
              </div>
              <div class="mb-2">
                <label for="image" class="form-label text-capitalize">Imagen (URL)</label>
                <input type="url" class="form-control form-control-sm" id="image" required placeholder="https://...">
              </div>
              <div class="mb-3">
                <label for="category" class="form-label text-capitalize">Categoría</label>
                <input type="text" class="form-control form-control-sm" id="category" required placeholder="Ej. Electrónica">
              </div>
              <div class="text-center">
                <button class="btn btn-success w-100" onclick="saveProduct()">
                  <i class="fa-solid fa-floppy-disk me-1"></i>Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
    document.getElementById('viewModal').innerHTML = modalUser
    const modal = new bootstrap.Modal(document.getElementById('modalUser'))
    modal.show()
}

function saveProduct() {
    const form = document.getElementById('formaddProduct');
    if (form.checkValidity()) {
        const id = document.getElementById('id').value
        const title = document.getElementById('title').value
        const description = document.getElementById('description').value
        const image = document.getElementById('image').value
        const price = parseFloat(document.getElementById('price').value);
        const category = document.getElementById('category').value
        const productData = {
            id: id,
            title: title,
            price: price,
            description: description,
            image: image,
            category: category
        }
        console.log(productData)
        fetch('https://dummyjson.com/products/add', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        })
            .then((result) => {
                console.log(result)
                return result.json().then(
                    data => {
                        return {
                            status: result.status,
                            body: data
                        }
                    }
                )
            })
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    document.getElementById('info').innerHTML = '<h3>Producto registrado correctamente</h3>'
                } else {
                    document.getElementById('info').innerHTML = '<h3>Error al registrar el producto</h3>'
                }
                const modal = bootstrap.Modal.getInstance(document.getElementById('modalUser'))
                modal.hide()
            })
    }else{
        form.reportValidity()
    }
}
