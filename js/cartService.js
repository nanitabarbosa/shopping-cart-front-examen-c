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
