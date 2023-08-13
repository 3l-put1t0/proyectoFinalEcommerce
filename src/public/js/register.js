const registerForm = document.getElementById("registerForm");

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(registerForm);
    console.log('data: ', data);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));
    console.log(obj);
    const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const responseData = await response.json();
    if (responseData.status === 'success') {
        window.location.replace('/login');
    }
});