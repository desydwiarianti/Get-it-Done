function showTab(tabId) {
    // Select all tabs and sections
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('.team-members');

    // Remove active class from all tabs and hide all sections
    tabs.forEach(tab => tab.classList.remove('active'));
    sections.forEach(section => section.style.display = 'none');

    // Show the selected tab and make it active
    document.querySelector(`#${tabId}`).style.display = 'flex';
    document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add('active');
}

// Initial display setup
document.querySelector('#leadership').style.display = 'flex';
