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



