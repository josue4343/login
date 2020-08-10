//Registrarse
const alertDiv = document.querySelector('.alert-errors-container');
const registrarsefor = document.querySelector('#registrarse-forma');
registrarsefor.addEventListener('submit', (e) => {
    e.preventDefault();
    const registraremail = document.querySelector('#registrar-emaila').value;
    const registrarpassword = document.querySelector('#registrar-passa').value;

    console.log(registraremail, registrarpassword)

    auth
        .createUserWithEmailAndPassword(registraremail, registrarpassword)
        .then(userCredential => {
            //clear the form
            registrarsefor.reset();

            //close the modal
            $('#registrarsea').modal('hide')
            window.location.href = 'bot.html';
        })
});

//iniciar sesion loggeo
const iniciarform = document.querySelector('#iniciar-forma');

iniciarform.addEventListener('submit', (e) => {

        e.preventDefault();
        const iniciaremail = document.querySelector('#iniciar-emaila').value;
        const iniciarpassword = document.querySelector('#iniciar-passa').value;
        auth
            .signInWithEmailAndPassword(iniciaremail, iniciarpassword)
            .then(userCredential => {
                //clear the form
                registrarsefor.reset();

                //close the modal
                $('#iniciarsesion').modal('hide')
                window.location.href = 'bot.html'
            })
            .catch(e => {
                showError(e.message);
            })
    })
    //salir

const salir = document.querySelector('#salira');

salir.addEventListener('click', e => {
        e.preventDefault();
        auth.signOut().then(() => {
            location.href = "index.html"
        })
    })
    //avento
auth.onAuthStateChanged(user => {
    if (user) {
        // location.href = "bot.html"
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