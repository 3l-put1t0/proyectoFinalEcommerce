async function action(event) {
    const param = event.target.id;
    const classs = event.target.className;

    console.log(param);
    console.log(classs);

    if (classs == 'delete') {
        const response = await fetch(`/api/products/${String(param)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const responseData = await response.json();
        if (responseData.status === 'success') window.location.reload();;
    }

    if (classs == 'edit') {
        localStorage.setItem('id', param);
        window.location.replace('/products/modify');      
    }

}

function add() { 
    window.location.replace('/products/add')
}

function view(event){
    const param = event.target.id;
        
    if(param == 'viewCart') window.location.replace('/carts')
    if(param == 'viewUsers') window.location.replace('/users')
}
