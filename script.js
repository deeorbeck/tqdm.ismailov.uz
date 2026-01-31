// API Configuration
const API_BASE_URL = 'https://api.tqdm.ismailov.uz';

// DOM Elements
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const darkModeToggle = document.getElementById('darkModeToggle');
const searchResults = document.getElementById('searchResults');
const quickLinks = document.querySelectorAll('.quick-link');

// Type labels for display
const typeLabels = {
    'pptx': 'Taqdimot',
    'docx': 'Referat',
    'test': 'Test',
    'crossword': 'Krossvord',
    'kurs_ishi': 'Kurs ishi'
};

// API Functions
async function searchDocuments(text, type = null) {
    const params = new URLSearchParams({
        text: text
    });

    if (type) {
        params.append('type', type);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/search?${params.toString()}`);
        if (!response.ok) {
            throw new Error('Qidiruvda xatolik yuz berdi');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Search Form Handler
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = searchInput.value.trim();
    const category = categorySelect.value;

    if (!query) {
        alert('Iltimos, qidiruv so\'zini kiriting!');
        return;
    }

    // Show loading state
    const submitBtn = searchForm.querySelector('.search-btn');
    const originalIcon = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    try {
        // Search documents
        const type = category || null;
        const results = await searchDocuments(query, type);

        // Display results
        displaySearchResults(results, query, type);

    } catch (error) {
        console.error('Search error:', error);
        displayNoResults(query);
    } finally {
        // Reset button
        submitBtn.innerHTML = originalIcon;
        submitBtn.disabled = false;
    }
});

// Display Search Results
function displaySearchResults(results, query, type) {
    // Clear previous results
    searchResults.innerHTML = '';

    // Check if results exist
    if (!results || results.length === 0) {
        displayNoResults(query);
        return;
    }

    // Create results container
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'results-list';

    // Create results header
    const resultsHeader = document.createElement('div');
    resultsHeader.className = 'results-header';
    resultsHeader.innerHTML = `
        <h3>${results.length} ta natija</h3>
        <p>"${query}" bo'yicha</p>
    `;
    searchResults.appendChild(resultsHeader);

    // Add result items
    results.forEach((item, index) => {
        const displayType = typeLabels[item.type] || item.type || 'Hujjat';
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.style.animationDelay = `${index * 0.08}s`;

        resultItem.innerHTML = `
            <div class="result-type-icon type-${item.type}">${displayType.charAt(0)}</div>
            <div class="result-content">
                <div class="result-title">${item.text}</div>
                <div class="result-meta">ID: ${item.id}</div>
            </div>
            <a href="https://t.me/taqdimot_robot?start=id_${item.id}" target="_blank" class="result-download" aria-label="Yuklab olish">
                Yuklab olish
            </a>
        `;
        resultsContainer.appendChild(resultItem);
    });

    searchResults.appendChild(resultsContainer);

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Display No Results
function displayNoResults(query) {
    searchResults.innerHTML = `
        <div class="no-results">
            <div class="no-results-icon"><i class="fas fa-search"></i></div>
            <h3>Hech narsa topilmadi</h3>
            <p>"${query}" bo'yicha hech qanday hujjat topilmadi</p>
            <div class="no-results-tips">
                <ul>
                    <li>Boshqa so'zlar bilan urinib ko'ring</li>
                    <li>Qisqaroq so'zlar ishlating</li>
                    <li>Boshqacha yozishni sinab ko'ring</li>
                </ul>
            </div>
            <div class="no-results-cta">
                <a href="https://t.me/taqdimot_robot" target="_blank" class="btn-cta">
                    <i class="fab fa-telegram"></i> Telegram bot
                </a>
            </div>
        </div>
    `;
}

// Quick Links Handler
quickLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const type = link.getAttribute('data-type');

        // Update category select
        categorySelect.value = type;

        // Scroll to search
        searchForm.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Focus search input
        searchInput.focus();
    });
});

// Dark Mode Toggle
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    const iconElement = darkModeToggle.querySelector('i');

    if (document.body.classList.contains('dark-mode')) {
        if (iconElement) {
            iconElement.classList.replace('fa-moon', 'fa-sun');
        }
        darkModeToggle.title = 'Yorugin mod';
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#1a1a1a');
    } else {
        if (iconElement) {
            iconElement.classList.replace('fa-sun', 'fa-moon');
        }
        darkModeToggle.title = 'Qorongi mod';
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff');
    }

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
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#1a1a1a');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadDarkMode();

    // Check if there's a search query in URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    const category = urlParams.get('category');

    if (searchQuery) {
        searchInput.value = searchQuery;
        if (category) {
            categorySelect.value = category;
        }
        // Trigger search
        searchForm.dispatchEvent(new Event('submit'));
    }
});
