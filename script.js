const inputTask = document.querySelector('#inputTask')
const btnAddTask = document.querySelector('.btnAddTask')
let list = document.querySelector('#list')

let tasks = JSON.parse(localStorage.getItem('list_storage')) || []


function showTasks(){
    list.innerHTML = ''

    for (task of tasks) {

        let pos = tasks.indexOf(task)
        list.innerHTML += `<li id="${pos}"><span>${task}</span><div class="removeEdit"><div class="remove" onclick="removeTask(${pos})"></div><div class="edit" onclick="openScreenEdit(${pos})"></div></div></li>`
    }
}

showTasks()

function addTasks(){

    let task = inputTask.value

    tasks.push(task)
    inputTask.value = ''
    showTasks()
    saveTaskInLocalStorage()
}

btnAddTask.addEventListener('click', addTasks)
inputTask.addEventListener('keypress', (e)=>{
    if(e.keyCode == 13) {
        addTasks()
    }
})


function saveTaskInLocalStorage(){

    localStorage.setItem('list_storage', JSON.stringify(tasks))
}


function removeTask(pos){

    tasks.splice(pos, 1)
    showTasks()
    saveTaskInLocalStorage()
}


function editTask(pos){
    let inputEditTask = 'algo'.value
    tasks.splice(pos, 1, inputEditTask)

    // Essa é a função para editar uma tarefa
    // Ele irá pegar o indíce do elemento clicado (pos), pegar apenas elemento (1), e mudar para p que fpo inputado (inputEditTask) 

}

function openScreenEdit(pos){

    let screenEdit = document.querySelector(".screenEdit")
    let editInputTask = document.querySelector('#editInputTask')
    let h1 = document.querySelector('#h1')
    
    screenEdit.classList.add('open')
    editInputTask.value = tasks[pos]
    h1.innerHTML = `<span id="${pos}">#${pos}</span>`
}

function closeScreenEdit(){
    let screenEdit = document.querySelector(".screenEdit")
    screenEdit.classList.remove('open')
}


function saveEditTask(){
    let editInputTask = document.querySelector('#editInputTask').value
    let h1 = document.querySelector('#h1').children[0]
    let pos = h1.id
    tasks.splice(pos, 1, editInputTask)
    closeScreenEdit()
    saveTaskInLocalStorage()
    showTasks()
}