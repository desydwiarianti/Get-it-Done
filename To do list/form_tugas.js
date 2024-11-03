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


document.addEventListener("DOMContentLoaded", () => {
    renderCalendar();
    loadTasks(); // Muat tugas setelah kalender dirender
});

function renderCalendar() {
    const calendar = document.getElementById("calendar");
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.setAttribute("data-date", dateStr);
        dayElement.textContent = day;

        calendar.appendChild(dayElement);
    }
}

// Fungsi untuk memuat tugas dari localStorage dan menambahkannya ke kalender
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        const taskDate = task.date;

        // Cari elemen tanggal di kalender berdasarkan atribut data-date
        const dayElement = document.querySelector(`[data-date='${taskDate}']`);

        if (dayElement) {
            // Buat elemen tugas dan tambahkan ke elemen hari
            const taskElement = document.createElement("div");
            taskElement.classList.add("calendar-task");
            taskElement.textContent = `${task.name} (${task.startTime} - ${task.endTime})`;

            dayElement.appendChild(taskElement);
        }
    });
}

// Fungsi untuk membuka popup
function openPopup() {
    document.getElementById("popup").style.display = "flex";
}

// Fungsi untuk menutup popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Fungsi untuk menambahkan kategori baru ke dropdown
function addCategory() {
    const newCategory = document.getElementById("new-category").value;
    if (newCategory) {
        const select = document.getElementById("category-select");
        const option = document.createElement("option");
        option.value = newCategory.toLowerCase();
        option.textContent = newCategory;
        select.appendChild(option);
        document.getElementById("new-category").value = "";
        closePopup();
    }
}

// Fungsi untuk menyimpan task dan menampilkan pesan sukses
function saveTask() {
    // Ambil nilai input dari form
    const taskName = document.getElementById("task-name").value;
    const taskDate = document.getElementById("task-date").value;
    const taskStartTime = document.getElementById("task-start-time").value;
    const taskEndTime = document.getElementById("task-end-time").value;
    const category = document.getElementById("category-select").value;
    const remind = document.getElementById("remind-toggle").checked;

    // Validasi input
    if (!taskName || !taskDate || !taskStartTime || !taskEndTime) {
        alert("Harap lengkapi semua field tugas.");
        return;
    }

    // Buat objek tugas
    const task = {
        name: taskName,
        date: taskDate,
        startTime: taskStartTime,
        endTime: taskEndTime,
        category: category,
        remind: remind
    };

    // Simpan tugas di localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Tampilkan pesan sukses
    const successMessage = document.getElementById("success-message");
    successMessage.style.display = "block";
    
    // Sembunyikan pesan setelah 3 detik dan alihkan ke kalender
    setTimeout(() => {
        successMessage.style.display = "none";
        // Reload kalender untuk menampilkan tugas yang baru ditambahkan
        location.reload();
    }, 3000);
}
function saveTask() {
    // Ambil nilai input dari form
    const taskName = document.getElementById("task-name").value;
    const taskDate = document.getElementById("task-date").value;
    const taskStartTime = document.getElementById("task-start-time").value;
    const taskEndTime = document.getElementById("task-end-time").value;
    const category = document.getElementById("category-select").value;
    const remind = document.getElementById("remind-toggle").checked;

    // Validasi input
    if (!taskName || !taskDate || !taskStartTime || !taskEndTime) {
        alert("Harap lengkapi semua field tugas.");
        return;
    }

    // Buat objek tugas
    const task = {
        name: taskName,
        date: taskDate,
        startTime: taskStartTime,
        endTime: taskEndTime,
        category: category,
        remind: remind
    };

    // Simpan tugas di localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Tampilkan pesan sukses
    const successMessage = document.getElementById("success-message");
    successMessage.style.display = "block";
    
    // Sembunyikan pesan setelah 3 detik
    setTimeout(() => {
        successMessage.style.display = "none";
        
        // Tambahkan tugas ke kalender tanpa reload
        const dayElement = document.querySelector(`[data-date='${taskDate}']`);
        if (dayElement) {
            // Buat elemen tugas dan tambahkan ke elemen hari
            const taskElement = document.createElement("div");
            taskElement.classList.add("calendar-task");
            taskElement.textContent = `${task.name} (${task.startTime} - ${taskEndTime})`;
            dayElement.appendChild(taskElement);
        }

        // Reset form setelah menyimpan
        document.querySelector('.task-form').reset();
    }, 3000);
}

