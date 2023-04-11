let authToken = localStorage.getItem('authToken')
const requestHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': authToken
}
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
        response.json().then(
          tasks => {
            listaDeTarefas.push(tarefaParaInserir)
            novaTarefaRef.value = ""
            tarefasPendentesRef.innerHTML = ''

            getTasks()

          }
        )
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

  let requestConfig = {
    method: 'GET',
    headers: requestHeaders
  }
  fetch('https://todo-api.ctd.academy/v1/tasks', requestConfig).then(
    response => {
      if (response.ok) {
        response.json().then(
          tasks => {
            console.log(tasks)
            for (let task of tasks) {
              if (task.completed) {
                // Adicionar no array de listaTarefasFinalizada
                listaTarefasFinalizadas.push(task)

              } else {
                // Adicionar no array de listaDeTarefas
                listaDeTarefas.push(task)
              }
              showTasks(listaDeTarefas, "A Fazer");
              showTasks(listaTarefasFinalizadas, "Finalizadas")
            }
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
            <div class="not-done"id="${task.id}"></div>
            <div class="descricao">
              <p class="nome" id="nomeTarefa">${task.description}</p>
              <p class="timestamp">Criada em: ${createAtFormated}</p>
              <button class="excluir" id=${task.id}> excluir</button>
            </div>
        </li>
          `
    }
  } else {
    tarefasTerminadasRef.innerHTML = ''
    for (let task of tarefa) {
      const createdAtDate = new Date(task.createdAt)
      const createAtFormated = new Intl.DateTimeFormat('pt-BR').format(createdAtDate)
      tarefasTerminadasRef.innerHTML += `
      <div>
          <li class="tarefa">
            <div class="not-done" id="${task.id}"></div>
            <div class="descricao">
              <p class="nome" id="nomeTarefa">${task.description}</p>
              <p class="timestamp" >${createAtFormated}</p>
              
            </div>
        </li>
      </div>
          `
    }
  }
  addEventListenersToButtonsDone()
  addEventListenersToButtonsDelete()
}

function addEventListenersToButtonsDelete() {
  const buttonDeleteArray = Array.from(tarefasPendentesRef.children)
  buttonDeleteArray.map(
    (item, index) => {
      const selecionaDivDescricao = item.children[1]
      const selecionarBotaoDelete = selecionaDivDescricao.children[2]

      const indexTarefaAtual = listaDeTarefas[index]

      selecionarBotaoDelete.addEventListener('click', () => deleteTask(indexTarefaAtual))

    }

  )
}
function addEventListenersToButtonsDone() {
  const buttonDoneArray = Array.from(tarefasPendentesRef.children)
  buttonDoneArray.map(
    (item, index) => {
      const selecionaDivDescricao = item.children[0]
      // console.log(selecionaDivDescricao)

      const indexTarefaAtual = listaDeTarefas[index]

      selecionaDivDescricao.addEventListener('click', () => changeStatus(indexTarefaAtual))

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
function checkIfTokenIsValid() {
  if (authToken === null) {
    logoutUser()
  } else {
    getUserData()
  }
}
function deleteTask(taskIndex) {
  // console.log(taskIndex)
  // console.log(`clicou em ${taskIndex.id}`)


  // configurações do request
  let requestConfig = {
    method: 'DELETE',
    headers: requestHeaders,
  }

  // Realização da Request para criar uma nova Task
  fetch(`https://todo-api.ctd.academy/v1/tasks/${taskIndex.id}`, requestConfig).then(
    response => {
      if (response.ok) {
        response.json().then(
          tasks => {
            alert("tarefa excluida com sucesso")
          }
        )
      } else {
        console.log('tarefa não foi excluida')
      }

    }
  )
  tarefasPendentesRef.innerHTML = ''
  getTasks()

}
function changeStatus(taskIndex) {
  const tarefaParaInserir =
  {
    "description": novaTarefaRef.value,
    "completed": true
  }
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
        response.json().then(
          tasks => {
            alert("tarefa concluída")
          }
        )
      } else {
        console.log('erro tarefa concluida')
      }

    }
  )
  tarefasPendentesRef.innerHTML = ''
  getTasks()

}


checkIfTokenIsValid()



closeAppRef.addEventListener('click', logoutUser)
btnEnviarTarefaRef.addEventListener('click', adicionarTarefa)
btnEnviarTarefaRef.addEventListener('click', (e) => e.preventDefault())
// window.addEventListener('click', doneNotDone)

