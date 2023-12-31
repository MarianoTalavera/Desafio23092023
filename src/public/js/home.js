const socket = io.connect('http://localhost:4000')
const form = document.getElementById('idForm')
const botonProds = document.getElementById('botonProductos')
    socket.on('show-products', (products) => {
        const tableBody = document.querySelector("#productsTable tbody");
        let tableContent = '';
        if (products && Array.isArray(products)) {
        products.forEach(product => {
            tableContent += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.title}</td>
                    <td>${product.description}</td>
                    <td>${product.price}</td>
                    <td>${product.thumbnail}</td>
                    <td>${product.code}</td>
                    <td>${product.stock}</td>
                    <td>${product.status}</td>
                </tr>
            `;});
    } else {
        console.error('No definido', products);
    }
        tableBody.innerHTML = tableContent;
    });
    
    socket.emit('update-products');
    document.addEventListener('DOMContentLoaded', () => {
        const userDataCookie = getCookie('userData');
        console.log(userDataCookie);
        if (userDataCookie) {
            const decodedUserDataCookie = decodeURIComponent(userDataCookie);
            const userData = JSON.parse(decodedUserDataCookie.substring(2));
            console.log(userData)
            const welcomeMessage = `¡Bienvenidx ${userData.first_name} (${userData.email}) a Tés del Sur!`;
            Swal.fire({
                icon: 'success',
                title: 'Conexión ok!',
                text: welcomeMessage
            });}});
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }