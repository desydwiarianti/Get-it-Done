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