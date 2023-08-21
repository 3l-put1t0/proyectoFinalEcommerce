async function action(event) {
    const param = event.target.id;
    const classs = event.target.className;;

    if (classs == 'delete') {
        const response = await fetch(`/api/users/${String(param)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const responseData = await response.json();
        if (responseData.status === 'success') window.location.replace('/users');;
    }

    if (classs == 'edit') {}
}

// async function logout(){
//     const obj = {
//         logout: true
//     };
//     const response = await fetch('/api/logout', {
//         method: 'POST',
//         body: JSON.stringify(obj),
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     });
//     const responseData = await response.json();
//     if (responseData.status === 'success') window.location.replace('/login');;
// }

// Handlebars.registerHelper('isAdmin', function (value) {
//     return value === 'ADMINISTRATOR';
// });