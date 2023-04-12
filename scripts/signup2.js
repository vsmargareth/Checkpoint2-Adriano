const inputNameRef = document.querySelector('#nameUser');
const inputLastNameRef = document.querySelector('#lastNameUser');
const inputEmailRef = document.querySelector('#emailUser');
const inputPasswordRef = document.querySelector('#passwordUser');
const inputPasswordRepeatRef = document.querySelector('#passwordUserRepeat');
const buttonRef = document.querySelector('#btnSignUp');
const divInputWrapper = document.querySelector('.input-wrapper');


var formErrors = {
    name: true,
    lastName: true,
    email: true,
    password: true,
    passwordRepeat: true
}

function passwordValidity() {
    let password = inputPasswordRef.value
    let passwordRepeat = inputPasswordRepeatRef.value
    let passwordReapeatFather = inputPasswordRepeatRef.parentElement

    if (password === passwordRepeat) { // se as funções forem iguais
        // Mudar no objeto de erros para false
        formErrors.passwordRepeat = false
    } else {
        passwordReapeatFather.classList.add('error')
    }


}
function inputValidity(inputRef) {
    const inputValid = inputRef.checkValidity()
    const inputFather = inputRef.parentElement

    if (inputValid) {
        inputFather.classList.remove('error')
    } else {
        inputFather.classList.add('error')
    }
    formErrors[inputRef.id] = !inputValid
}
function checkAllCamps() {
    inputValidity(inputNameRef)
    inputValidity(inputLastNameRef)
    inputValidity(inputEmailRef)
    inputValidity(inputPasswordRef)
    passwordValidity()
    // inputNameRef.addEventListener('keyup', () => inputValidity(inputNameRef))
    // inputLastNameRef.addEventListener('keyup', () => inputValidity(inputLastNameRef))
    // inputEmailRef.addEventListener('keyup', () => inputValidity(inputEmailRef))
    // inputPasswordRef.addEventListener('keyup', () => inputValidity(inputPasswordRef))
    // inputPasswordRepeatRef.addEventListener('keyup', () => inputValidity(inputPasswordRepeatRef))

}

function checkFormValidity() {
    checkAllCamps()

    const formErrorArray = Object.values(formErrors)
    const formValidity = formErrorArray.every(item => item === false)
    buttonRef.disabled = formValidity
    if (formValidity) {
        userRegister()
    } else {
        console.log("campo errado")
    }
}
buttonRef.addEventListener('click', checkAllCamps)
buttonRef.addEventListener('click', (e) => e.preventDefault())
// buttonRef.addEventListener('click', (event) => userRegister(event))

// API


function userRegister() {
    console.log("entrou na função")

    var userData = {
        firstName: inputNameRef.value,
        lastName: inputLastNameRef.value,
        email: inputEmailRef.value,
        password: inputPasswordRef.value
    }
    let userDataArray = Object.values(userData);
    const requestHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    var requestConfig = {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(userData)
    }
    fetch('https://todo-api.ctd.academy/v1/users', requestConfig).then(
        response => {
            if (response.ok) {

                alert('Você foi cadastrado com sucesso')

                window.location.href = 'index.html'

            } else {

                alert('O usuário ja foi cadastrado')


            }
        }
    )


}
