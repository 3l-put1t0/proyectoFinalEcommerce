const socket = io();

const container = document.getElementById('container');
const infoUser = document.getElementById('infoUser');
const options = document.getElementById('options');
let email = '*@';
let role = 'role';
let responseData;

function createButtonOptions(role) {
    console.log('buttons');
    let addButton;
    let viewCartButton;
    let viewUserButton;

    if (role == 'ADMINISTRATOR' || role == 'PREMIUN') {
        addButton = document.createElement('button');
        addButton.id = 'addProduct';
        addButton.setAttribute("onClick", "add()");
        addButton.innerText = 'AGREGAR PRODUCTO';
    }

    if (role == 'PREMIUN' || (role == 'USER' && role != 'ADMINISTRATOR')) {
        viewCartButton = document.createElement('button');
        viewCartButton.id = 'viewCart';
        viewCartButton.setAttribute("onClick", "view(event)");
        viewCartButton.innerText = 'VER CARRITO';
    } else {
        viewUserButton = document.createElement('button');
        viewUserButton.id = 'viewUsers';
        viewUserButton.setAttribute("onClick", "view(event)");
        viewUserButton.innerText = 'VER USUARIOS';
    }

    if (role == 'ADMINISTRATOR' || role == 'PREMIUN') options.append(addButton);
    if (role == 'PREMIUN' || (role == 'USER' && role != 'ADMINISTRATOR')) {
        options.append(viewCartButton);
    } else {
        options.append(viewUserButton);
    }
}

async function getUser() {
    console.log('user');
    const response = await fetch(`/api/login`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    // const responseData = await response.json();
    responseData = await response.json();
    // console.log(responseData);
    email = responseData.payload.email;
    role = responseData.payload.role;
    console.log(responseData.payload.email);
    console.log(responseData.payload.role);
    infoUser.innerHTML = `<h2>USUARIO: ${email}</h2>
                        <h2>Role: ${role}</h2>`;

    createButtonOptions(role);
}

getUser();

socket.on('products', data => {
    let contador = 0;
    console.log('websocket: ', data);
    container.innerText = "";
    for (const i of data.docs) {
        contador++;
        const section = document.createElement('section');
        section.className = "product";
        container.append(section);

        const hr = document.createElement('hr');

        const id = document.createElement('h1');
        id.id = `id_${contador}`
        id.innerText = `id: ${i.id}`

        const title = document.createElement('h2');
        title.id = `title_${contador}`
        title.innerText = `Title: ${i.title}`

        const description = document.createElement('h3');
        description.id = `description_${contador}`
        description.innerHTML = `Description: <br> ${i.description}`;

        const stock = document.createElement('h3');
        stock.id = `stock_${contador}`
        stock.innerHTML = `Stock: ${i.stock}`;

        const price = document.createElement('h4');
        price.id = `price_${contador}`
        price.innerText = `Price: ${i.price}`;

        const category = document.createElement('h5');
        category.id = `category_${contador}`
        category.innerText = `Category: ${i.category}`;

        const status = document.createElement('h5');
        status.id = `status_${contador}`
        status.innerHTML = `Activo: ${i.status}`;

        const owner = document.createElement('h5');
        owner.id = `owner_${contador}`;
        owner.innerHTML = `Dueño: ${i.owner}`;

        const buttonEdit = document.createElement('button');
        buttonEdit.id = i.id;
        buttonEdit.className = 'edit';
        buttonEdit.innerText = 'EDITAR';
        // if (email != i.owner && role != 'ADMINISTRATOR') {
        // buttonEdit.disabled = true;
        // }
        buttonEdit.setAttribute("onClick", "action(event)");

        const buttonEliminar = document.createElement('button');
        buttonEliminar.id = i.id;
        buttonEliminar.className = 'delete';
        buttonEliminar.innerText = 'ELIMINAR';
        console.log(email);
        console.log(role);
        if (email != i.owner && role != 'ADMINISTRATOR') {
            buttonEliminar.disabled = true;
        }
        buttonEliminar.setAttribute("onClick", "action(event)");

        const buttonAddCart = document.createElement('button');
        buttonAddCart.id = i.id;
        buttonAddCart.className = 'create';
        buttonAddCart.innerText = 'AÑADIR A CARRITO';
        if (email == i.owner) {
            buttonAddCart.disabled = true;
        }
        if (!i.status) {
            buttonAddCart.disabled = true;        
        }
        if (role == 'ADMINISTRATOR') {
            buttonAddCart.disabled = true;
        }
        buttonAddCart.setAttribute("onClick", "action(event)");

        const labelAmount = document.createElement('label');
        labelAmount.className = 'labelAmount';
        labelAmount.innerText = 'cantidad a comprar';

        const amount = document.createElement('input');
        amount.type = 'Number';
        amount.name = 'amount';
        amount.min = 0;
        amount.value = 0;

        section.append(hr);
        section.append(id);
        section.append(title)
        section.append(description);
        section.append(stock);
        section.append(price);
        section.append(category);
        section.append(status);
        section.append(owner);
        section.append(buttonEdit);
        section.append(buttonEliminar);
        section.append(buttonAddCart);
        section.append(labelAmount);
        section.append(amount);
    }
});

