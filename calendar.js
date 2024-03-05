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

