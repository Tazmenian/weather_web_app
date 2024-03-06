document.addEventListener("DOMContentLoaded", function() {
    const addTodoButton = document.getElementById("addTodo");
    const todoFormContainer = document.getElementById("todoFormContainer");
    const todoList = document.getElementById("todoList");

    let todoCount = 0;

    addTodoButton.addEventListener("click", function() {
        const todoForm = createTodoForm();
        todoFormContainer.appendChild(todoForm);
    });

    function createTodoForm() {
        const form = document.createElement("form");
        form.innerHTML = `
            <input type="time" name="time">
            <input type="date" name="date">
            <input type="text" name="activity" placeholder="Activity">
            <button type="submit"><i class="fa-solid fa-plus"></i></button>
        `;

        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            const time = formData.get("time");
            const date = formData.get("date");
            const activity = formData.get("activity");

            const todoItem = createTodoItem(time, date, activity);
            todoList.appendChild(todoItem);
            todoFormContainer.removeChild(form);
        });

        return form;
    }

    function createTodoItem(time, date, activity) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${time}, ${date}, ${activity}</span>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;

        const editButton = li.querySelector(".edit");
        editButton.addEventListener("click", function() {
            const editForm = createTodoForm();
            const formData = editForm.elements;
            formData.time.value = time;
            formData.date.value = date;
            formData.activity.value = activity;
            todoList.replaceChild(editForm, li);
        });

        const deleteButton = li.querySelector(".delete");
        deleteButton.addEventListener("click", function() {
            todoList.removeChild(li);
        });

        return li;
    }
});
