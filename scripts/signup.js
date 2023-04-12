const inputNameRef = document.querySelector('#nameUser');
const inputLastNameRef = document.querySelector('#lastNameUser');
const inputEmailRef = document.querySelector('#emailUser');
const inputPasswordRef = document.querySelector('#passwordUser');
const inputPasswordRepeatRef = document.querySelector('#passwordUserRepeat');
const buttonRef = document.querySelector('#btnSignUp');
const divInputWrapper = document.querySelector('.input-wrapper');

buttonRef.disabled = true
var formErrors = {
    nameUser: true,
    lastNameUser: true,
    emailUser: true,
    passwordUser: true,
    passwordUserRepeat: true
}
function userRegister(e) {
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

                Swal.fire('Cadastro realizado com sucesso!')

                window.location.href = 'index.html'

            } else {

                Swal.fire('O usuário ja foi cadastrado')


            }
        }
    )


}
function checkFormValidity() {
    // checkAllCamps()

    const formErrorArray = Object.values(formErrors)
    const formValidity = formErrorArray.every(item => item === false)
    console.log(formValidity)
    buttonRef.disabled = !formValidity
    if (formValidity) {
        buttonRef.addEventListener("click", (e) => userRegister(e))

    } else {
        console.log("campo errado")
    }
}
function passwordValidity() {
    let password = inputPasswordRef.value
    let passwordRepeat = inputPasswordRepeatRef.value
    let passwordReapeatFather = inputPasswordRepeatRef.parentElement

    if (password === passwordRepeat) { // se as funções forem iguais
        // Mudar no objeto de erros para false
        formErrors.passwordUserRepeat = false
        passwordReapeatFather.classList.remove('error')
    } else {
        passwordReapeatFather.classList.add('error')
    }

    console.log(formErrors)
    checkFormValidity()
}
function inputValidity(inputRef) {
    const inputValid = inputRef.checkValidity()
    const inputFather = inputRef.parentElement
    buttonRef.disable = true
    if (inputValid) {
        inputFather.classList.remove('error')
    } else {
        inputFather.classList.add('error')
    }
    formErrors[inputRef.id] = !inputValid
}
inputNameRef.addEventListener('keyup', () => inputValidity(inputNameRef))
inputLastNameRef.addEventListener('keyup', () => inputValidity(inputLastNameRef))
inputEmailRef.addEventListener('keyup', () => inputValidity(inputEmailRef))
inputPasswordRef.addEventListener('keyup', () => inputValidity(inputPasswordRef))
inputPasswordRepeatRef.addEventListener('keyup', () => passwordValidity())

buttonRef.addEventListener('click', (e) => e.preventDefault())