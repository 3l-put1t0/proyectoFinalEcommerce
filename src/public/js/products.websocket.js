const socket = io();

const container = document.getElementById('container');

socket.on('products', data => {
    let contador = 0;
    console.log(data);
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

        const price = document.createElement('h4');
        price.id = `price_${contador}`
        price.innerText = `Price: ${i.price}`;

        const category = document.createElement('h5');
        category.id = `category_${contador}`
        category.innerText = `Category: ${i.category}`;  
        
        const buttonEdit = document.createElement('button');
        buttonEdit.id = i.id;
        buttonEdit.className = 'edit';
        buttonEdit.innerText = 'EDITAR';
        buttonEdit.setAttribute("onClick", "action(event)");

        const buttonEliminar = document.createElement('button');
        buttonEliminar.id = i.id;
        buttonEliminar.className = 'delete';
        buttonEliminar.innerText = 'ELIMINAR';
        buttonEliminar.setAttribute("onClick", "action(event)");

        section.append(hr);
        section.append(id);
        section.append(title)
        section.append(description);
        section.append(price);
        section.append(category);
        section.append(buttonEdit);
        section.append(buttonEliminar);
    }
});