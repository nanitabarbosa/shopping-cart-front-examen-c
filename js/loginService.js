document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const user = document.getElementById('user').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!user || !password) {
        alertBuilder('danger', 'Todos los campos son obligatorios.');
        return;
    }

    console.log('Intentando login...');
    localStorage.removeItem('token');

    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: user,
            password: password,
            expiresInMins: 30
        }),
    })
        .then(res => res.json())
        .then(data => {
            console.log('Datos recibidos del login:', data);

            const token = data.token || data.accessToken;

            if (!token) {
                alertBuilder('danger', 'Nombre de usuario o contraseña incorrectos.');
                return;
            }

            localStorage.setItem('token', token);
            alertBuilder('success', 'Inicio de sesión exitoso.');

            setTimeout(() => {
                window.location.href = 'admin/dashboard.html';
            }, 1000);
        })
        .catch(error => {
            console.error('Error al hacer login:', error);
            alertBuilder('danger', 'Error inesperado al iniciar sesión.');
        });
});

function alertBuilder(alertType, message) {
    const alert = `<div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>`;
    document.getElementById('mensaje').innerHTML = alert;
}