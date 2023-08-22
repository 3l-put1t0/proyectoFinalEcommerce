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
        // window.location.replace('/users/modify');      
    }
}

function add() { 
    window.location.replace('/products/add')
}
