function loadTodo() {
    // This function loads todo from local Storage
    const todo = JSON.parse(localStorage.getItem("todo")) || { "todoList": [] };
    return todo;
}

function refreshTodos(todos) {
    localStorage.setItem('todo', JSON.stringify(todos));
}

function addTodoToLocalStorage(todo) {
    const todos = loadTodo();
    todos.todoList.push(todo);
    localStorage.setItem("todo", JSON.stringify(todos));
}

function appendTodoInHtml(todo) {
    const todoList = document.getElementById('todoList');
    const todoItem = document.createElement('li');
    todoItem.setAttribute('data-id', todo.id);
    const textDiv = document.createElement("div");

    textDiv.textContent = todo.text;
    // console.log(todo);
    // console.log(todo.text);
    if (todo.isCompleted) {
        textDiv.classList.add('completed');
    }

    todoItem.classList.add('todoItem');

    const wrapper = document.createElement("div");
    wrapper.classList.add('todoButtons');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('editBtn');

    editBtn.addEventListener('click', editTodo);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.classList.add('delBtn');

    delBtn.addEventListener('click', deleteTodos);

    const completedBtn = document.createElement('button');
    completedBtn.textContent = (todo.isCompleted) ? 'Reset' : 'Completed';
    completedBtn.classList.add('completedBtn');

    completedBtn.addEventListener('click', toggleTodo);

    wrapper.appendChild(editBtn);
    wrapper.appendChild(delBtn);
    wrapper.appendChild(completedBtn);

    todoItem.appendChild(textDiv);
    todoItem.appendChild(wrapper);

    todoList.appendChild(todoItem);
}

function resetHtmlTodos(todos) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    });
}

function toggleTodo(event) {
    const todoItem = event.target.parentElement.parentElement;
    const todoId = todoItem.getAttribute("data-id");
    const todos = loadTodo();
    todos.todoList.forEach(todo => {
        if (todo.id == todoId) {
            todo.isCompleted = !todo.isCompleted;
        }
    });
    refreshTodos(todos);
    resetHtmlTodos(todos);
}

function deleteTodos(event) {
    const todoItem = event.target.parentElement.parentElement;
    const todoId = todoItem.getAttribute("data-id");
    const todos = loadTodo();
    const newList = todos.todoList.filter(todo => todo.id != todoId);

    refreshTodos({ "todoList": newList });
    resetHtmlTodos({ "todoList": newList });
}

function editTodo(event) {
    const todoItem = event.target.parentElement.parentElement;
    const todoId = todoItem.getAttribute("data-id");
    const todos = loadTodo();
    const response = prompt('New value');
    todos.todoList.forEach(todo => {
        if (todo.id == todoId) {
            todo.text = response;
        }
    });
    refreshTodos(todos);
    resetHtmlTodos(todos);
}

document.addEventListener('DOMContentLoaded', () => {

    const input = document.getElementById("todoInput");
    const submit = document.getElementById("btn-addTodo");
    const todoList = document.getElementById("todoList");

    const filterbtns = document.getElementsByClassName('filterBtn');

    function executeFilterAction(event) {
        const element = event.target;
        const value = element.getAttribute('data-filter');
        todoList.innerHTML = '';
        const todos = loadTodo();
        if (value === 'all') {
            todos.todoList.forEach(todo => {
                appendTodoInHtml(todo);
            });
        } else if (value === 'pending') {
            todos.todoList.forEach(todo => {
                if (todo.isCompleted !== true) {
                    appendTodoInHtml(todo);
                }
            });
        } else {
            todos.todoList.forEach(todo => {
                if (todo.isCompleted === true) {
                    appendTodoInHtml(todo);
                }
            });
        }
    }

    for (btn of filterbtns) {
        btn.addEventListener('click', executeFilterAction);
    }

    submit.addEventListener('click', (event) => {
        const todos = loadTodo();
        const text = input.value;
        if (text === '') {
            alert('Please write something for the todo.');
        } else {
            const todo = {
                text: input.value,
                isCompleted: false,
                id: todos.todoList.length,
            }
            addTodoToLocalStorage(todo);
            appendTodoInHtml(todo);
            input.value = '';
        }
    })
    input.addEventListener("change", (event) => {
        // This call back method is fired when whenever there is change in input event
        const text = event.target.value;
        event.target.value = text.trim();
    });

    input.addEventListener("keydown", (event) => {
        const todos = loadTodo();
        if (event.key === 'Enter') {
            const text = input.value;
            if (text === '') {
                alert('Please write something for the todo.');
            } else {

                const todo = {
                    text: input.value,
                    isCompleted: false,
                    id: todos.todoList.length,
                }
                addTodoToLocalStorage(todo);
                appendTodoInHtml(todo);
                input.value = '';
            }
        }
    });
    const todos = loadTodo();
    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    });

});