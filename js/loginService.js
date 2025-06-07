document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('user').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!user || !password) {
        alertBuilder('danger', 'Todos los campos son obligatorios.');
        return;
    }

    console.log('peTicion');

    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: user,
            password: password,
            expiresInMins: 30
        }),
    })
        .then(res => {
            console.log('Respuesta recibida:', res);
            return res.json();
        })
        .then(data => {
            console.log('Datos del login:', data);
            window.location.href = 'admin/dashboard.html';
        })
        .catch(error => {
            console.error('Error al hacer login:', error);
        });

});

function alertBuilder(alertType, message) {
    const alert = `<div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
  </div>`;
    document.getElementById('mensaje').innerHTML = alert;
}