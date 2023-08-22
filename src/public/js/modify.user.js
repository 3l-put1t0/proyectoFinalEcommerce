const id = localStorage.getItem('id');
localStorage.removeItem('id');

const inputFirstName = document.getElementById('firstName');
const inputLastName = document.getElementById('lastName');
const inputEmail = document.getElementById('email');
const inputRole = document.getElementById('role');

const updateUserForm = document.getElementById('modifyUserForm');

async function changeData() {
    const response = await fetch(`/api/users/${String(id)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const responseData = await response.json();

    inputFirstName.value = responseData.payload.firstName;
    inputLastName.value = responseData.payload.lastName;
    inputEmail.value = responseData.payload.email;
    inputRole.value = responseData.payload.role;
}

changeData();

updateUserForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(modifyUserForm);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));
    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const responseData = await response.json();
    if (responseData.status === "success") window.location.replace('/users');
    if (responseData.status === "error") {
        alert(`No se actualizó el usuario con id: ${id}`);
        window.location.replace('/users');
    }
});