let inputEmailRef = document.querySelector('#inputEmail')
let inputPasswordRef = document.querySelector('#inputPassword')
let btnRef = document.querySelector('#btn')
let formRef = document.querySelector('#formPrincipal')


function checkIfNotEmpty(e) {
    e.preventDefault()
    if (inputEmailRef.value === "" || inputPasswordRef.value === "") {
        formRef.classList.add('error')
    } else {
        loginUser(e)
    }

}

function loginUser(e) {


    const userData = {
        email: `${inputEmailRef.value}`,
        password: `${inputPasswordRef.value}`
    }
    const requestHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    const requestConfig = {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(userData)
    }
    fetch('https://todo-api.ctd.academy/v1/users/login', requestConfig).then(
        response => {
            if (response.ok) {
                response.json().then(
                    token => {
                        localStorage.setItem('authToken', token.jwt)
                        formRef.classList.remove('error')
                        window.location.href = '/tarefas.html'
                        console.log(response)
                    }
                )
            }
            if (response.status === 400 || response.status === 404) {
                formRef.classList.add('error')
                localStorage.clear()
            }
        }
    )
}


btnRef.addEventListener('click', (e) => checkIfNotEmpty(e))




