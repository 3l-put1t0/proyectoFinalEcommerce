const id = localStorage.getItem('id');
localStorage.removeItem('id');

const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputCode = document.getElementById('code');
const inputPrice = document.getElementById('price');
const inputStatus = document.querySelector('input[name="status"]:checked');
const inputStock = document.getElementById('stock');
const inputCategory = document.getElementById('category');
const inputOwner = document.getElementById('owner');


function setRadio(name, value) {
    document.querySelectorAll(`input[name="${name}"]`).forEach(element => {
        if(element.value == value) {
            element.checked = true;
        }
    });
}

async function changeData() {
    const response = await fetch(`/api/products/${String(id)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const responseData = await response.json();
    console.log(responseData);
    inputTitle.value = responseData.payload.title
    inputDescription.value = responseData.payload.description;
    inputCode.value = responseData.payload.code;
    inputPrice.value = responseData.payload.price;
    responseData.payload.status ? setRadio('status', 'true'): setRadio('status', 'false');
    inputStock.value = responseData.payload.stock;
    inputCategory.value = responseData.payload.category;
    inputOwner.value = responseData.payload.owner;
}

changeData();

const modifyProductForm = document.getElementById("modifyProductForm");

modifyProductForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(modifyProductForm);
    const obj = {};
    console.log(obj);
    data.forEach((value, key) => (obj[key] = value));
    const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const responseData = await response.json();
    if (responseData.status === 'success') {
        window.location.replace('/products');
    }
});

function back(){
    window.location.replace('/products');
}