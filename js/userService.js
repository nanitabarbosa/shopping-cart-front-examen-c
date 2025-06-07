function users() {
    document.getElementById('cardHeader').innerHTML = '<h5>Listado de usuarios</h5>';
    const ENDPOINT = 'https://dummyjson.com/users';

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
            if (result.status === 200 && Array.isArray(result.info.users)) {
                let list_user = `<table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombres</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Edad</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
            `;

                result.info.users.forEach(element => {
                    list_user += `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.firstName}</td>
                        <td>${element.lastName}</td>
                        <td>${element.age}</td>
                        <td><button type="button" class="btn btn-outline-info" onclick="getUser('${element.id}')">Ver</button></td>
                    </tr>
                `;
                });

                list_user += `
                </tbody>
            </table>
            `;

                document.getElementById('info').innerHTML = list_user;
            } else {
                document.getElementById('info').innerHTML = 'No existen usuarios';
            }
        });
}



function getUser(idUser) {
    console.log(idUser);
    const ENDPOINT = 'https://dummyjson.com/users/' + idUser;

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
                const user = response.body;
                console.log("Usuario encontrado:", user);

                const modalUser = `
                <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Ver usuario</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="card text-center">
                                    <img src="${user.image}" class="rounded-circle mx-auto" style="width: 100px; height: 100px; object-fit: cover;" alt="Imagen del usuario">
                                    <div class="card-body">
                                        <h5 class="card-title">Información del usuario</h5>
                                        <p class="card-text">Nombre: ${user.firstName}</p>
                                        <p class="card-text">Apellido: ${user.lastName}</p>
                                        <p class="card-text">Edad: ${user.age}</p>
                                        <p class="card-text">Email: ${user.email}</p>
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

                document.getElementById('viewModal').innerHTML = modalUser;

                const modal = new bootstrap.Modal(document.getElementById('modalUser'));
                modal.show();
            } else {
                document.getElementById('info').innerHTML = '<h3>No se encontró el usuario en la API</h3>';
            }
        });
}
