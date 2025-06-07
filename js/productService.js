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
