document.cookie = 'userData' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/sessions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })});
        const data = await response.json();
        if (response.status === 200 || response.status === 401 ) {
            window.location.href = "/home";
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo un problema...',
                text: data.resultado
            });}
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Hubo un problema...',
            text: 'Error al iniciar sesión'
        });}});