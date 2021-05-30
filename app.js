const todoForm = document.querySelector('.todo-form')
const taskInput = document.querySelector('#task-input')
const todos = document.querySelector('.todos')
const tasksToDelete = document.querySelector("#delete-tasks")
const deleteButton = document.querySelector("#delete-button")

let tasks
if (localStorage.todos) {
    tasks = JSON.parse(localStorage.getItem("todos"))
}
else {
    tasks = []
}

deleteSection = document.querySelector('#delete-section')

function hideDeleteSection(tasks) {
    if (tasks.length == 0) {
        deleteSection.classList.add("d-none")
    }
    
    else {
        deleteSection.classList.remove("d-none")
    }
}

function addTodos(tasks) {
    todos.innerHTML = ""
    tasksToDelete.innerHTML = `<option selected>All</option>`

    if (tasks) {
        tasks.forEach(task => {
            tasksToDelete.innerHTML += `<option value="${task.id}">${task.task}</option>`
            if (task.complete) {
               
                todos.innerHTML += `<li class="list-group-item text-red"><del> ${task.task}</del></li>`
            } else {
                todos.innerHTML += `<li class="list-group-item">${task.task}</li>`
        }
       
        })
    }
    hideDeleteSection(tasks)
    localStorage.setItem("todos" , JSON.stringify(tasks))
}

addTodos(tasks)

todoForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const date = Date.now()
    tasks = [{id: date,  task: taskInput.value, complete: false } , ...tasks]
    addTodos(tasks)
    todoForm.reset()
})

todos.addEventListener("click", (event) => {
    
    tasks = tasks.map(element => {
        if (element.task == event.target.textContent.trim()) {
            element.complete = !element.complete
            
            
            
        }
        return element
    })
    addTodos(tasks)
    
})






deleteButton.addEventListener("click", () => {
    const value = tasksToDelete.value
    if (value == "All") {
    localStorage.removeItem("todos")
    tasks = []
    hideDeleteSection(tasks)
    addTodos(tasks)
    } else {
        tasks = tasks.filter(task => task.id != value)
        addTodos(tasks)

    }
})


