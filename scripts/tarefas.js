let authToken = localStorage.getItem('authToken')
const requestHeaders = {
  'Accept':'application/json',
  'Content-Type': 'application/json',
  'Authorization': authToken
}
let closeAppRef = document.querySelector('#closeApp')
const btnEnviarTarefaRef = document.querySelector('#btnEnviarTarefa')
let novaTarefaRef = document.querySelector('#novaTarefa')
let tarefasPendentesRef = document.querySelector('#tarefasPendentes')


closeAppRef.addEventListener('click', logoutUser)
btnEnviarTarefaRef.addEventListener('click', addTask)
btnEnviarTarefaRef.addEventListener('click', (e) => e.preventDefault())

let listaDeTarefas = []
let listaTarefasFinalizadas = []


function addTask() {
  //Capturar inputs
  let novaTarefa = novaTarefaRef.value

  let tarefaParaInserir =
  {
    taksName: novaTarefa,
  }

  // adicionar na lista de tarefas
  listaDeTarefas.push(tarefaParaInserir)

  //Gerando a lista de tarefas

  let contentHTML = ''

  for (let tarefa of listaDeTarefas) {
    contentHTML += `
    <div>
        <li class="tarefa">
          <div class="not-done"></div>
          <div class="descricao">
            <p class="nome" id="nomeTarefa">${tarefa.taksName}</p>
            <p class="timestamp">Criada em: 04/04/2023</p>
          </div>
      </li>
    </div>
        `
  }
  tarefasPendentesRef.innerHTML = contentHTML;
  novaTarefaRef.value = ''
}

//comunicação com banco de dados

function logoutUser() {
  window.location.href = '/index.html'
  localStorage.clear()
}
function getTasks() {

  let requestConfig = {
    method: 'GET',
    headers: requestHeaders
  }
  fetch('https://todo-api.ctd.academy/v1/tasks', requestConfig).then(
    response=> {
      if(response.ok) {
          response.json().then(
            tasks => {
              for(let task of tasks) {
                if(task.completed) {
                    // Adicionar no array de listaTarefasFinalizada
                } else {
                  // Adicionar no array de listaDeTarefas
                }
              }
            }
          )
      }
    }
  )
}


function getUserData() {
  let apiLink = 'https://todo-api.ctd.academy/v1/users/getMe'

  let requestConfig = {
      method: 'GET',
      headers: requestHeaders
  }
  fetch(`${apiLink}`, requestConfig).then(
      response=> {
          if(response.ok) {
              getTasks() 
          } else {
              console.log(response)
              if(response.status === 401) {
                      logoutUser()
              }
          }
      }
  )
}
function checkIfTokenIsValid() {
  if(authToken === null ) {
    logoutUser()
  } else {
    getUserData()
  }
}
checkIfTokenIsValid()





