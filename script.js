function loadTodo() {
    // This function loads todo from local Storage
    const todo = JSON.parse(localStorage.getItem("todo")) || { "todoList": [] };
    return todo;
}

function addTodoToLocalStorage(text) {
    const todo = loadTodo();
    todo.todoList.push(text);
    localStorage.setItem("todo", JSON.stringify(todo));
}

function appendTodoInHtml(text) {
    const todoList = document.getElementById('todoList');
    const todoItem = document.createElement('li');
    todoItem.textContent = text;
    todoItem.classList.add('todoItem');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('editBtn');

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.classList.add('delBtn');

    const completedBtn = document.createElement('button');
    completedBtn.textContent = 'Completed';
    completedBtn.classList.add('completedBtn');

    todoItem.appendChild(editBtn);
    todoItem.appendChild(delBtn);
    todoItem.appendChild(completedBtn);

    todoList.appendChild(todoItem);
}

document.addEventListener('DOMContentLoaded', () => {

    const input = document.getElementById("todoInput");
    const submit = document.getElementById("btn-addTodo");
    const todoList = document.getElementById("todoList");
    submit.addEventListener('click', (event) => {
        const text = input.value;
        if (text === '') {
            alert('Please write something for the todo.');
        } else {
            addTodoToLocalStorage(text);
            appendTodoInHtml(text);
            input.value = '';
        }
    })
    input.addEventListener("change", (event) => {
        // This call back method is fired when whenever there is change in input event
        const text = event.target.value;
        event.target.value = text.trim();
    });

    input.addEventListener("keydown", (event) => {
        if (event.key === 'Enter') {
            const text = input.value;
            if (text === '') {
                alert('Please write something for the todo.');
            } else {
                addTodoToLocalStorage(text);
                appendTodoInHtml(text);
                input.value = '';
            }
        }
    });

    const todos = loadTodo();

    todos.todoList.forEach(todo => {
        const newTodoItem = document.createElement("li");
        newTodoItem.textContent = todo;
        todoList.appendChild(newTodoItem);
    });
});