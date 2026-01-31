// API Configuration
const API_BASE_URL = 'https://api.tqdm.ismailov.uz';

// DOM Elements
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const darkModeToggle = document.getElementById('darkModeToggle');

// API Functions
async function searchDocuments(text, type = null, page = 1, pageSize = 10) {
    const params = new URLSearchParams({
        text: text,
        page: page,
        page_size: pageSize,
        randomize: 'false'
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

async function getItemCount() {
    try {
        const response = await fetch(`${API_BASE_URL}/items/count`);
        if (!response.ok) {
            throw new Error('Sonlarni olishda xatolik');
        }
        const count = await response.json();
        return count;
    } catch (error) {
        console.error('API Error:', error);
        return 100000; // Fallback to default
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
    const submitBtn = searchForm.querySelector('button');
    const originalIcon = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    try {
        // Map category to type
        const typeMap = {
            'taqdimotlar': 'taqdimotlar',
            'referatlar': 'referatlar'
        };
        const type = typeMap[category] || null;

        // Search documents
        const results = await searchDocuments(query, type);

        // Display results
        displayResults(results, query, type);

    } catch (error) {
        console.error('Search error:', error);
        alert('Qidiruvda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
    } finally {
        // Reset button
        submitBtn.innerHTML = originalIcon;
        submitBtn.disabled = false;
    }
});

// Display Results
function displayResults(results, query, type) {
    // Remove existing results container if exists
    const existingResults = document.getElementById('searchResults');
    if (existingResults) {
        existingResults.remove();
    }

    // Check if results exist
    if (!results || results.length === 0) {
        showNoResults(query);
        return;
    }

    // Create results container
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'searchResults';
    resultsContainer.className = 'search-results';

    // Create results header
    const resultsHeader = document.createElement('div');
    resultsHeader.className = 'results-header';
    resultsHeader.innerHTML = `
        <h3>Qidiruv natijalari: "${query}"</h3>
        <p>${results.length} ta hujjat topildi</p>
    `;
    resultsContainer.appendChild(resultsHeader);

    // Create results grid
    const resultsGrid = document.createElement('div');
    resultsGrid.className = 'results-grid';

    // Add result cards
    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.innerHTML = `
            <div class="result-type">${item.type || type || 'Hujjat'}</div>
            <div class="result-text">${item.text}</div>
            <div class="result-meta">
                <span>ID: ${item.id}</span>
                <a href="https://t.me/taqdimot_robot?start=${item.id}" target="_blank" class="btn-download">
                    <i class="fas fa-download"></i> Yuklab olish
                </a>
            </div>
        `;
        resultsGrid.appendChild(card);
    });

    resultsContainer.appendChild(resultsGrid);

    // Insert after hero section
    const heroSection = document.querySelector('.hero-section');
    heroSection.parentNode.insertBefore(resultsContainer, heroSection.nextSibling);

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Show No Results
function showNoResults(query) {
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'searchResults';
    resultsContainer.className = 'search-results';

    resultsContainer.innerHTML = `
        <div class="no-results">
            <div class="no-results-icon"><i class="fas fa-search-minus"></i></div>
            <h3>Hech narsa topilmadi</h3>
            <p>"${query}" bo'yicha hech qanday hujjat topilmadi.</p>
            <div class="no-results-tips">
                <p>Boshqa so'zlar bilan urinib ko'ring:</p>
                <ul>
                    <li>Qisqaroq so'zlar ishlating</li>
                    <li>Boshqacha yozishni sinab ko'ring</li>
                    <li>Boshqa toifani tanlang</li>
                </ul>
            </div>
            <a href="https://t.me/taqdimot_robot" target="_blank" class="btn-cta">
                <i class="fab fa-telegram"></i> Telegram bot orqali qidirish
            </a>
        </div>
    `;

    const heroSection = document.querySelector('.hero-section');
    heroSection.parentNode.insertBefore(resultsContainer, heroSection.nextSibling);
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Dark Mode Toggle
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

// Handle browser back/forward
window.addEventListener('popstate', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    const category = urlParams.get('category');

    if (searchQuery) {
        searchInput.value = searchQuery;
        if (category) {
            categorySelect.value = category;
        }
        searchForm.dispatchEvent(new Event('submit'));
    } else {
        // Clear results if no search query
        const existingResults = document.getElementById('searchResults');
        if (existingResults) {
            existingResults.remove();
        }
    }
});
