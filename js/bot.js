const salir = document.querySelector('#salir');

salir.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then(() => {
        window.location.href = 'index.html';
    })
})