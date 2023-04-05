const nameUserRef     = document.querySelector('#nameUser')
const lastNameUserRef = document.querySelector('#lastNameUser')
const emailRef        = document.querySelector('#emailUser')
const passwordRef     = document.querySelector('#passwordUser')
const passwordUserRepeatRef = document.querySelector('#passwordUserRepeat')
const btnSignUpRef    = document.querySelector('#btnSignUp')

btnSignUpRef.addEventListener('click',verifyUser)

btnSignUpRef.addEventListener('click',(e)=>signupUser(e.preventDefault()))


function verifyUser() {
    if(passwordRef.value != passwordUserRepeatRef.value) {
        alert('Senhas precisam ser iguais!')
    }
}

function signupUser() {
    const userData = {
        firstName: `${nameUserRef.value}`,
        lastName: `${lastNameUserRef.value}`,
        email: `${emailRef.value}`,
        password: `${passwordRef.value}`
    }
    const requestHeaders = {
        'Content-Type': 'application/json',
        'Accept':'application/json'
    }


    const requestConfig = {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(userData)
    }

    fetch('https://todo-api.ctd.academy/v1/users', requestConfig)
    .then(response => {
        if(response.ok) {
            return response.json(); 
        } else {
            throw new Error('Erro ao obter dados do servidor.');
        }
    })
    .then(data => {
        window.location.href = './tarefas.html';
    })
    .catch(error => {
        console.error(error);
    });
}




