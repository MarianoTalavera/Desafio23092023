const form = document.getElementById('signupForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        age: parseInt(e.target.age.value),
        email: e.target.email.value,
        password: e.target.password.value
    };
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok) {
            try {
                Swal.fire({
                    title: 'Registro ok!',
                    text: 'Vamos a la página de inicio',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/login';
                    }});
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error en el registro',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });}
        } else {
            alert(`Error: ${data.mensaje}`);
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Error al registrar. Hacelo por favor nuevamente.');
}});