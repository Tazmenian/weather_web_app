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
        const formcontainer = document.querySelector('#todoFormContainer');
       

        form.innerHTML = `
          <input type="time" name="time">
          <input type="date" name="date">
          <input type="text" name="activity" placeholder="Activity">
          <button type="submit"><i class="fa-solid fa-plus"></i></button>
          <button type="button" class="close-button"> <i class="fa-solid fa-times"></i>
          </button>
        `;
        formcontainer.style.display = 'block';
        

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const time = formData.get("time");
            const date = formData.get("date");
            const activity = formData.get("activity");
            const listContainer = document.querySelector('#todoList');
            const formcontainer = document.querySelector('#todoFormContainer');
    
            const todoItem = createTodoItem(time, date, activity);
            todoList.appendChild(todoItem);
            todoFormContainer.removeChild(form);
            listContainer.style.display = 'block';
            formcontainer.style.display = 'none';
        });
    
        form.querySelector('.close-button').addEventListener('click', (event) => {
            event.preventDefault();
            const formcontainer = document.querySelector('#todoFormContainer');
            todoFormContainer.removeChild(form);
            formcontainer.style.display = 'none';
        });
    
        return form;
    }
    
    
 
    
      
      
      

    function createTodoItem(time, date, activity) {
        const li = document.createElement("li");
        li.innerHTML = 
        // Button for edit temporarily disabled
        `
            <span>${time}, ${date}, ${activity}</span>
            <!--<button class="edit">Edit</button>-->
            <button class="delete">Delete</button>
        `;

        // const editButton = li.querySelector(".edit");
        // editButton.addEventListener("click", function() {
        //     const editForm = createTodoForm();
        //     const formData = editForm.elements;
        //     formData.time.value = time;
        //     formData.date.value = date;
        //     formData.activity.value = activity;
        //     todoList.replaceChild(editForm, li);
        // });

        const deleteButton = li.querySelector(".delete");
        deleteButton.addEventListener("click", function() {
            todoList.removeChild(li);
            const listItems = todoList.querySelectorAll('li');
            const listContainer = document.querySelector('#todoList');
            if (listItems.length === 0){
                listContainer.style.display = 'none';
            }
        });
        return li;
    }
});
