const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('EVENT: ', event);
    const data = new FormData(loginForm);
    console.log('data: ', data);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));
    console.log('obj: ', obj);
    const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const responseData = await response.json();
    if (responseData.status === "success") window.location.replace('/products');
    if (responseData.status === "error") {
        alert('El usuario no existe, por favor registrese');
        window.location.replace('/register');
    }
});