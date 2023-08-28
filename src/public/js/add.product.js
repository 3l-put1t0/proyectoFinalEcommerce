const addProductForm = document.getElementById("addProductForm");

const inputOwner = document.getElementById('owner');

changeData();

addProductForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(addProductForm);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));
    console.log(obj);
    const response = await fetch('/api/products', {
        method: 'POST',
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

async function changeData(){
    const response = await fetch('/api/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const responseData = await response.json();
    inputOwner.value = responseData.payload.email;
}



function back(){
    window.location.replace('/products');
}