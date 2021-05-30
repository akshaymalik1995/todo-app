const todoForm = document.querySelector('.todo-form')
const taskInput = document.querySelector('#task-input')
const todos = document.querySelector('.todos')
let tasks
if (localStorage.todos) {
    tasks = JSON.parse(localStorage.getItem("todos"))
}
else {
    tasks = []
}

resetBtn = document.querySelector('#reset')

function removeResetButton(tasks) {
    if (tasks.length == 0) {
        resetBtn.classList.add("d-none")
    }
    
    else {
        resetBtn.classList.remove("d-none")
    }
}

function addTodos(tasks) {
    todos.innerHTML = ""
    if (tasks) {
        tasks.forEach(task => {
            if (task.complete) {
                todos.innerHTML += `<li class="list-group-item text-red"><del> ${task.task}</del></li>`
            } else {
                todos.innerHTML += `<li class="list-group-item">${task.task}</li>`
        }
       
        })
    }
    removeResetButton(tasks)
    localStorage.setItem("todos" , JSON.stringify(tasks))
}

addTodos(tasks)

todoForm.addEventListener("submit", (event) => {
    event.preventDefault()
    // tasks.push({task : taskInput.value, complete : false})
    tasks = [{ task: taskInput.value, complete: false } , ...tasks]
    addTodos(tasks)
    todoForm.reset()
})

todos.addEventListener("click", (event) => {
    console.log(event.target.textContent.trim())
    // tasks = tasks.filter(element => element.task !== event.target.innerHTML)
    tasks = tasks.map(element => {
        if (element.task == event.target.textContent.trim()) {
            element.complete = !element.complete
            console.log(element.task)
            
            
        }
        return element
    })
    addTodos(tasks)
    
})







reset.addEventListener("click", () => {
    localStorage.removeItem("todos")
    tasks = []
    removeResetButton(tasks)
    addTodos(tasks)
})

