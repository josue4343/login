//registrarse
const alertDiv = document.querySelector('.alert-errors-container');
const registrarsefor = document.querySelector('#registrarse-form');
registrarsefor.addEventListener('submit', (e) => {
    e.preventDefault();
    const registraremail = document.querySelector('#registrar-email').value;
    const registrarpassword = document.querySelector('#registrar-pass').value;


    auth
        .createUserWithEmailAndPassword(registraremail, registrarpassword)
        .then(userCredential => {
            //clear the form
            registrarsefor.reset();

            //close the modal
            $('#registrarse').modal('hide')
            window.location.href = 'bot.html';
        })
});

//iniciar sesion loggeo

const iniciarform = document.querySelector('#iniciar-form');

iniciarform.addEventListener('submit', (e) => {

        e.preventDefault();
        const iniciaremail = document.querySelector('#iniciar-email').value;
        const iniciarpassword = document.querySelector('#iniciar-pass').value;
        auth
            .signInWithEmailAndPassword(iniciaremail, iniciarpassword)
            .then(userCredential => {
                //clear the form
                iniciarform.reset();

                //close the modal
                $('#iniciarsesion').modal('hide')
                window.location.href = 'bot.html';
            })
            .catch(e => {
                showError(e.message);
            })
    })
    //salir

const salir = document.querySelector('#salir');

salir.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('salir')
    })
})


//avento
auth.onAuthStateChanged(user => {
    if (user) {
        location.href = "bot.html"
        const userInfo = {
            email: user.email,
            token: user.refreshToken,
            uid: user.uid
        };
        sessionStorage.setItem('usuario', JSON.stringify(userInfo));
     
    } else {
        sessionStorage.removeItem('usuario');
    }
})

function showError(msg) {
    const alertError = document.createElement('div');
    alertError.className = 'alert alert-danger alert-dismissible fade show';
    alertError.setAttribute('role', 'alert');
    alertError.innerHTML = `
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            <span class="sr-only">Close</span>
        </button>
        <strong>Error!</strong> ${msg}
    `;
    alertDiv.appendChild(alertError);
}