function carts() {
    document.getElementById('cardHeader').innerHTML = '<h5>Listado de carritos</h5>';
    const ENDPOINT = 'https://dummyjson.com/carts';

    fetch(ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(response => {
            return response.json().then(data => {
                return {
                    status: response.status,
                    info: data
                };
            });
        })
        .then(result => {
            if (result.status === 200) {
                let list_carts = `<table class="table">
                <button type="button" class="btn btn-outline-success" onclick="addProductCart()">Agregar producto al carrito</button>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Usuario ID</th>
                        <th scope="col">Cantidad de productos</th>
                        <th scope="col">Total</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
            `;

                result.info.carts.forEach(cart => {
                    list_carts += `
                    <tr>
                        <td>${cart.id}</td>
                        <td>${cart.userId}</td>
                        <td>${cart.totalProducts}</td>
                        <td>$${cart.total}</td>
                        <td><button type="button" class="btn btn-outline-info" onclick="getCart('${cart.id}')">Ver</button></td>
                    </tr>
                `;
                });

                list_carts += `
                </tbody>
            </table>`;

                document.getElementById('info').innerHTML = list_carts;
            } else {
                document.getElementById('info').innerHTML = 'No existen carritos';
            }
        });
}

function getCart(idCart) {
    const ENDPOINT = 'https://dummyjson.com/carts/' + idCart;

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
                const cart = response.body;
                console.log("Carrito encontrado:", cart);

                let productsHtml = '';
                cart.products.forEach(p => {
                    productsHtml += `
                    <li>
                        <strong>${p.title}</strong> - Cantidad: ${p.quantity}, Precio: $${p.price}, Total: $${p.total}
                    </li>
                `;
                });

                const modalCart = `
                <div class="modal fade" id="modalCart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Ver carrito</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <p><strong>ID del carrito:</strong> ${cart.id}</p>
                                    <p><strong>ID del usuario:</strong> ${cart.userId}</p>
                                    <p><strong>Total de productos:</strong> ${cart.totalProducts}</p>
                                    <p><strong>Total a pagar:</strong> $${cart.total}</p>
                                    <p><strong>Productos:</strong></p>
                                    <ul>
                                        ${productsHtml}
                                    </ul>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

                document.getElementById('viewModal').innerHTML = modalCart;

                const modal = new bootstrap.Modal(document.getElementById('modalCart'));
                modal.show();
            } else {
                document.getElementById('info').innerHTML = '<h3>No se encontró el carrito en la API</h3>';
            }
        });
}

function addProductCart() {
    const modalUser = `
    <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content border-0 shadow-sm" style="width: 400px">
          <div class="modal-header bg-light">
            <h1 class="modal-title fs-5 fw-bold text-primary" id="exampleModalLabel" style="background-color: #C35C94; -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: transparent;">
              <i class="fa-solid fa-cart-plus me-2"></i>Agregar al Carrito
            </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>

          <div class="modal-body p-3">
            <form id="formaddProductCart">
              <div class="mb-2">
                <label for="userId" class="form-label text-capitalize">ID de Usuario</label>
                <input type="number" class="form-control form-control-sm" id="userId" required placeholder="Ej. 1">
              </div>
              <div class="mb-2">
                <label for="productId" class="form-label text-capitalize">ID del Producto</label>
                <input type="number" class="form-control form-control-sm" id="productId" required placeholder="Ej. 5">
              </div>
              <div class="mb-3">
                <label for="quantity" class="form-label text-capitalize">Cantidad</label>
                <input type="number" class="form-control form-control-sm" id="quantity" required placeholder="Ej. 2">
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-success w-100">
                  <i class="fa-solid fa-floppy-disk me-1"></i>Agregar al carrito
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
    document.getElementById('viewModal').innerHTML = modalUser;
    const modal = new bootstrap.Modal(document.getElementById('modalUser'));
    modal.show();

    // Asignar evento al formulario (lo hacemos aquí ya que el modal es dinámico)
    document.getElementById('formaddProductCart').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevenir envío clásico
        saveToCart();
    });
}

function saveToCart() {
    const userId = parseInt(document.getElementById('userId').value);
    const productId = parseInt(document.getElementById('productId').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    const cartData = {
        userId: userId,
        products: [
            {
                id: productId,
                quantity: quantity
            }
        ]
    };

    console.log("Enviando al carrito:", cartData);

    fetch('https://dummyjson.com/carts/add', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartData)
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("Respuesta del servidor:", data);
            document.getElementById('info').innerHTML = `<h3 class="text-success">Producto agregado al carrito correctamente</h3>`;
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalUser'));
            modal.hide();
        })
        .catch((error) => {
            console.error("Error al agregar al carrito:", error);
            document.getElementById('info').innerHTML = `<h3 class="text-danger">Error al agregar producto al carrito</h3>`;
        });
}