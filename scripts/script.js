let inputEmailRef = document.querySelector('#inputEmail')
let inputPasswordRef = document.querySelector('#inputPassword')
let btnRef = document.querySelector('#btn')
let formRef = document.querySelector('#formPrincipal')

btnRef.addEventListener('click',(e)=>loginUser(e))

function loginUser(e) {
    e.preventDefault() 

    const userData = {
        email: 'ivin32@mail.com.br',
        password: '1234'
    }
    const requestHeaders = {
        'Accept': 'application/json',
        'Content-Type':'application/json'
    }
    const requestConfig = {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(userData)
    }
    fetch('https://todo-api.ctd.academy/v1/users/login',requestConfig).then( 
        response=> {
            if(response.ok) {
                response.json().then(
                    token => {
                        localStorage.setItem('authToken',token.jwt)
                        window.location.href ='/tarefas.html'
                    }
                )
            } 
        }
    )
}








