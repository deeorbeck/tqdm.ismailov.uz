// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    const iconElement = darkModeToggle.querySelector('i');

    if (document.body.classList.contains('dark-mode')) {
        if (iconElement) {
            iconElement.classList.replace('fa-moon', 'fa-sun');
        }
        darkModeToggle.title = 'Yorugin mod';
    } else {
        if (iconElement) {
            iconElement.classList.replace('fa-sun', 'fa-moon');
        }
        darkModeToggle.title = 'Qorongi mod';
    }

    // Save preference
    saveDarkMode(document.body.classList.contains('dark-mode'));
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
        const iconElement = darkModeToggle.querySelector('i');
        if (iconElement) {
            iconElement.classList.replace('fa-moon', 'fa-sun');
        }
        darkModeToggle.title = 'Yorugin mod';
    }
}

// Initialize dark mode on load
loadDarkMode();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
