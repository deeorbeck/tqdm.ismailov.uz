// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    const moonIcon = darkModeToggle.querySelector('.fa-moon');
    const sunIcon = darkModeToggle.querySelector('.fa-sun');

    if (document.body.classList.contains('dark-mode')) {
        if (moonIcon) moonIcon.classList.replace('fa-moon', 'fa-sun');
        moonIcon.title = 'Yorugin mod';
    } else {
        if (sunIcon) sunIcon.classList.replace('fa-sun', 'fa-moon');
        sunIcon.title = 'Qorongi mod';
    }
});

// Save dark mode preference
function saveDarkMode(isDark) {
    localStorage.setItem('darkMode', isDark);
}

// Load dark mode preference
function loadDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        const moonIcon = darkModeToggle.querySelector('.fa-moon');
        if (moonIcon) moonIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Initialize dark mode on load
loadDarkMode();
