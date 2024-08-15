function loadTodo() {
    // This function loads todo from local Storage
    const todo = JSON.parse(localStorage.getItem("todo")) || { "todoList": [] };
    return todo;
}

function addTodoToLocalStorage(todoText) {
    const todo = loadTodo();
    todo.todoList.push({
        text: todoText,
        isCompleted: false,
    }
    );
    localStorage.setItem("todo", JSON.stringify(todo));
}

function appendTodoInHtml(todo) {
    const todoList = document.getElementById('todoList');
    const todoItem = document.createElement('li');

    const textDiv = document.createElement("div");

    textDiv.textContent = todo.text;
    todoItem.classList.add('todoItem');

    const wrapper = document.createElement("div");
    wrapper.classList.add('todoButtons');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('editBtn');

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.classList.add('delBtn');

    const completedBtn = document.createElement('button');
    completedBtn.textContent = 'Completed';
    completedBtn.classList.add('completedBtn');

    wrapper.appendChild(editBtn);
    wrapper.appendChild(delBtn);
    wrapper.appendChild(completedBtn);

    todoItem.appendChild(textDiv);
    todoItem.appendChild(wrapper);

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

                const todo = {
                    text: input.value,
                    isCompleted: false,
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