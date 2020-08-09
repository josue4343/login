const salir = document.querySelector('#salir');

salir.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then(() => {
       console.log('salir') 
    })
})