let authToken = localStorage.getItem('authToken')
const requestHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': authToken
}

let nameUserRef = document.querySelector('#nameUser')
let closeAppRef = document.querySelector('#closeApp')
const btnEnviarTarefaRef = document.querySelector('#btnEnviarTarefa')
let novaTarefaRef = document.querySelector('#novaTarefa')
let tarefasPendentesRef = document.querySelector('#tarefasPendentes')
let tarefasTerminadasRef = document.querySelector('#tarefasTerminadas')
let dot = document.querySelector('.not-done')



let listaDeTarefas = []
let listaTarefasFinalizadas = []

function adicionarTarefa() {
  //Informações sobre a tarefa
  const tarefaParaInserir =
  {
    "description": novaTarefaRef.value,
    "completed": false
  }
  // configurações do request
  let requestConfig = {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(tarefaParaInserir)

  }
  // Realização da Request para criar uma nova Task
  fetch('https://todo-api.ctd.academy/v1/tasks', requestConfig).then(
    response => {
      if (response.ok) {
        novaTarefaRef.value = ""
        getTasks()
      } else {
        console.log('tarefa não adicionada')
      }


    }
  )
} // fechamento adiciona tarefa 

//comunicação com banco de dados

function logoutUser() {
  window.location.href = '/index.html'
  localStorage.clear()
}
function getTasks() {
  listaDeTarefas = []
  listaTarefasFinalizadas = []
  let requestConfig = {
    method: 'GET',
    headers: requestHeaders
  }

  fetch('https://todo-api.ctd.academy/v1/tasks', requestConfig).then(
    response => {

      if (response.ok) {
        response.json().then(
          tasks => {

            for (let task of tasks) {
              if (task.completed) {
                // Adicionar no array de listaTarefasFinalizada
                listaTarefasFinalizadas.push(task)

              } else {
                // Adicionar no array de listaDeTarefas
                listaDeTarefas.push(task)
              }
            }
            showTasks(listaDeTarefas, "A Fazer");
            showTasks(listaTarefasFinalizadas, "Finalizadas")
          }
        )
      }
    }
  )
}
function showTasks(tarefa, target) {
  if (target === "A Fazer") {
    tarefasPendentesRef.innerHTML = ""
    for (let task of tarefa) {
      const createdAtDate = new Date(task.createdAt)
      const createAtFormated = new Intl.DateTimeFormat('pt-BR').format(createdAtDate)
      tarefasPendentesRef.innerHTML += `
      
          <li class="tarefa">
            <div class="not-done"></div>
            <div class="descricao">
              <p class="nome" id="nomeTarefa">${task.description}</p>
              <p class="timestamp">Criada em: ${createAtFormated}</p>
              <button class="excluir" id=${task.id}> excluir</button>
            </div>
        </li>
          `
    }
    addEventListenersToButtonsDone(tarefasPendentesRef, listaDeTarefas)
    addEventListenersToButtonsDelete(tarefasPendentesRef, listaDeTarefas)

  } else {
    tarefasTerminadasRef.innerHTML = ''
    for (let task of tarefa) {
      const createdAtDate = new Date(task.createdAt)
      const createAtFormated = new Intl.DateTimeFormat('pt-BR').format(createdAtDate)
      tarefasTerminadasRef.innerHTML += `
          <li class="tarefa">
            <div class="not-done" ></div>
            <div class="descricao">
              <p class="nome" id="nomeTarefa">${task.description}</p>
              <p class="timestamp" >${createAtFormated}</p>
              <button class="excluir" id=${task.id}> excluir</button>
            </div>
        </li>
          `
    }
    addEventListenersToButtonsDone(tarefasTerminadasRef, listaTarefasFinalizadas)
    addEventListenersToButtonsDelete(tarefasTerminadasRef, listaTarefasFinalizadas)

  }


}

function addEventListenersToButtonsDelete(divReferencia, arrayTarefa) {
  const buttonDeleteArray = Array.from(divReferencia.children)

  buttonDeleteArray.map(
    (item, index) => {
      const selecionaDivDescricao = item.children[1]

      const selecionarBotaoDelete = selecionaDivDescricao.children[2]

      const indexTarefaAtual = arrayTarefa[index]

      selecionarBotaoDelete.addEventListener('click', () => deleteTask(indexTarefaAtual))

    }

  )
}
function addEventListenersToButtonsDone(divReferencia, arrayTarefa) {
  let arrayReferencia = divReferencia.children

  const buttonDoneArray = Array.from(arrayReferencia)
  buttonDoneArray.map(
    (item, index) => {
      const selecionaDivNotDone = item.children[0]
      // console.log(selecionaDivNotDone)

      const indexTarefaAtual = arrayTarefa[index]

      selecionaDivNotDone.addEventListener('click', () => changeStatus(indexTarefaAtual))

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
    response => {
      console.log(response)
      if (response.ok) {
        getTasks()
      } else {
        console.log(response)
        if (response.status === 401) {
          logoutUser()
        }
      }

    }
  )
}
function nameUser(response) {
  // nameUserRef.innerHTML = response.firstName
  console.log(response.firstName)
}
function checkIfTokenIsValid() {
  if (authToken === null) {
    logoutUser()
  } else {
    getUserData()
  }
}
function deleteTask(taskIndex) {
  // configurações do request
  let requestConfig = {
    method: 'DELETE',
    headers: requestHeaders,
  }

  // Realização da Request para criar uma nova Task
  fetch(`https://todo-api.ctd.academy/v1/tasks/${taskIndex.id}`, requestConfig).then(
    response => {
      if (response.ok) {
        console.log("tarefa excluida")
        getTasks()
      } else {
        console.log('tarefa não foi excluida')
      }

    }
  )


}
function changeStatus(taskIndex) {

  let tarefaParaInserir = {}
  if (taskIndex.completed) {
    tarefaParaInserir = { completed: false }
  } else {
    tarefaParaInserir = { completed: true }
  }
  // {
  //   completed: true
  // }
  // configurações do request
  let requestConfig = {
    method: 'PUT',
    headers: requestHeaders,
    body: JSON.stringify(tarefaParaInserir)
  }
  // Realização da Request para criar uma nova Task
  fetch(`https://todo-api.ctd.academy/v1/tasks/${taskIndex.id}`, requestConfig).then(
    response => {
      if (response.ok) {
        getTasks()
      } else {
        console.log('erro tarefa concluida')
      }

    }
  )


}


checkIfTokenIsValid()



closeAppRef.addEventListener('click', logoutUser)
btnEnviarTarefaRef.addEventListener('click', adicionarTarefa)
btnEnviarTarefaRef.addEventListener('click', (e) => e.preventDefault())
// window.addEventListener('click', doneNotDone)

