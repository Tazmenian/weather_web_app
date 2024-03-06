// Declare global variables for current month and year
var currentMonth;
var currentYear;

document.addEventListener("DOMContentLoaded", function() {
    // Initialize current month and year
    var currentDate = new Date();
    currentMonth = currentDate.getMonth();
    currentYear = currentDate.getFullYear();

    // Display initial calendar
    displayCalendar(currentMonth, currentYear);
});

// Function to display the calendar for the given month and year
function displayCalendar(month, year) {
    var daysList = document.getElementById("daysList");
    daysList.innerHTML = ""; // Clear previous days

    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var firstDayOfMonth = new Date(year, month, 1).getDay();

    var currentMonthElement = document.getElementById("currentMonth");
    currentMonthElement.textContent = getMonthName(month) + " " + year;

    // Add blank spaces for the days before the first day of the month
    for (var i = 0; i < firstDayOfMonth; i++) {
        var li = document.createElement("li");
        li.textContent = "";
        daysList.appendChild(li);
    }

    // Add days to the calendar
    for (var i = 1; i <= daysInMonth; i++) {
        var li = document.createElement("li");
        li.textContent = i;

        // Check if the current date being displayed matches the current date
        var currentDate = new Date(year, month, i);
        var currentDateDay = currentDate.getDate();
        var currentDateMonth = currentDate.getMonth();
        var currentDateYear = currentDate.getFullYear();

        var today = new Date();
        var currentDay = today.getDate();
        var currentMonth = today.getMonth();
        var currentYear = today.getFullYear();

        if (currentDateDay === currentDay && currentDateMonth === currentMonth && currentDateYear === currentYear) {
            li.style.background = 'var(--color-dark)';
            li.style.color = 'var(--color-white)';
        }

        daysList.appendChild(li);
    }
}


// Function to navigate to the previous month
function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11; // December
        currentYear--;
    }
    displayCalendar(currentMonth, currentYear);
}

// Function to navigate to the next month
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0; // January
        currentYear++;
    }
    displayCalendar(currentMonth, currentYear);
}

// Helper function to get month name from index
function getMonthName(monthIndex) {
    var months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
    return months[monthIndex];
}


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
            <button type="submit">Add</button>
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
