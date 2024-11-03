// Element selector
const loginLink = document.getElementById('login-link');
const modal = document.getElementById('myModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const authSection = document.getElementById('auth-section');
const profileSection = document.getElementById('profile-section');
const logoutButton = document.getElementById('logout-button');

// Fungsi untuk membuka modal login
loginLink.addEventListener('click', (event) => {
    event.preventDefault();
    modal.style.display = 'flex';
});

// Fungsi untuk menutup modal login
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Menutup modal jika pengguna mengklik di luar konten modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Fungsi untuk mengubah tampilan saat login (contoh)
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    modal.style.display = 'none';
    loginLink.style.display = 'none';
    profileSection.style.display = 'flex';
});

// Fungsi untuk logout
logoutButton.addEventListener('click', () => {
    profileSection.style.display = 'none';
    loginLink.style.display = 'block';
});


// Elements
const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

// State
let currentDate = new Date();

// List of months
const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

// Function to render the calendar
function renderCalendar() {
    // Clear previous calendar days
    calendar.innerHTML = '';

    // Set month and year title
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    monthYear.textContent = `${months[month]} ${year}`;

    // Get the first day of the month and the number of days in the month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add day headers (Sunday to Saturday)
    const dayHeaders = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('day', 'day-header');
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    // Add empty days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day');
        calendar.appendChild(emptyDay);
    }

    // Add actual days of the month and load tasks
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        dayElement.setAttribute('data-date', dateStr);
        
        // Create date number container
        const dateNumber = document.createElement('div');
        dateNumber.classList.add('date-number');
        dateNumber.textContent = day;
        dayElement.appendChild(dateNumber);

        // Create tasks container
        const tasksContainer = document.createElement('div');
        tasksContainer.classList.add('tasks-container');

        // Load tasks for this day
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            if (task.date === dateStr) {
                const taskElement = document.createElement("div");
                taskElement.classList.add("calendar-task");
                
                // Create task text
                const taskText = document.createElement("span");
                taskText.textContent = `${task.name} (${task.startTime} - ${task.endTime})`;
                taskElement.appendChild(taskText);

                // Create delete button
                const deleteBtn = document.createElement("button");
                deleteBtn.classList.add("delete-task");
                deleteBtn.innerHTML = "×";
                deleteBtn.onclick = (e) => {
                    e.stopPropagation();
                    deleteTask(task, dateStr);
                    renderCalendar(); // Re-render calendar after deletion
                };
                taskElement.appendChild(deleteBtn);

                tasksContainer.appendChild(taskElement);
            }
        });

        dayElement.appendChild(tasksContainer);
        calendar.appendChild(dayElement);
    }
}

// Function to delete a task
function deleteTask(taskToDelete, dateStr) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(task => 
        !(task.date === dateStr && 
          task.name === taskToDelete.name && 
          task.startTime === taskToDelete.startTime && 
          task.endTime === taskToDelete.endTime)
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

// Function to go to the previous month
function goToPreviousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

// Function to go to the next month
function goToNextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

// Event listeners
prevMonthBtn.addEventListener('click', goToPreviousMonth);
nextMonthBtn.addEventListener('click', goToNextMonth);

// Initialize calendar on page load
renderCalendar();



