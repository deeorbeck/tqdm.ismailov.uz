let currentPage = 1;
let selectedCategory = ''; // Declare a global variable for selected category

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    const searchTerm = document.getElementById('searchInput').value.trim();
    selectedCategory = document.getElementById('categorySelect').value;

    if (searchTerm && selectedCategory) {
        currentPage = 1;
        // window.location.search = `?q=${encodeURIComponent(searchTerm)}&category=${selectedCategory}&page=${currentPage}`;
        fetchResults(searchTerm, selectedCategory, currentPage);
        updateURL(searchTerm)
        document.getElementById('nextPageButton').classList.add('hidden');
        document.getElementById('prevPageButton').classList.add('hidden');
    } else {
        alert('Please select a category and enter a search term.');
    }
});


document.getElementById('nextPageButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value.trim();

    if (searchTerm && selectedCategory) {
        currentPage++;
        fetchResults(searchTerm, selectedCategory, currentPage);
    }
});

document.getElementById('prevPageButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value.trim();

    if (currentPage > 1 && searchTerm && selectedCategory) {
        currentPage--;
        fetchResults(searchTerm, selectedCategory, currentPage);
    }
});

function updateURL(searchTerm) {
    const baseUrl = "https://tqdm.ismailov.uz"; // Your domain
    const newUrl = `${baseUrl}/?category=${encodeURIComponent(selectedCategory)}&q=${encodeURIComponent(searchTerm)}&page=${currentPage}`;
    
    // Change the browser's URL without reloading the page
    history.pushState({ path: newUrl }, '', newUrl);
}

function fetchResults(searchTerm, category, page) {
    const type = category === "taqdimotlar" ? "pptx" : "docx";
    
    // Construct the API URL
    const apiUrl = `https://api.tqdm.ismailov.uz/search?text=${encodeURIComponent(searchTerm)}&type=${type}&page=${page}&randomize=False`;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the entire response for debugging
            displayResults(data, category);
            managePagination(data.length);
           
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(items, category) { // Accept category as a parameter
    const resultDiv = document.getElementById('result');
    
    // Clear previous results
    resultDiv.innerHTML = '';

    if (!items || items.length === 0) {
        resultDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item'; // Add a class for styling

        // Determine if the item is "Rasmli" or "Rasmsiz"
        let turi = '';
        let displayText = item.text;

        if (item.text.includes("#wi")) {
            turi = "Rasmli";
            displayText = displayText.replace("#wi", "").trim(); // Remove "#wi" from text
        } else {
            turi = "Rasmsiz";
        }

        // Create inner HTML with formatted content and anchor tag as button
        itemDiv.innerHTML = `
            <div class="item-content">
                <p><strong>Mavzu:</strong> ${displayText}</p>
                ${category === "taqdimotlar" ? `<p><strong>Turi:</strong> ${turi}</p>` : ''}
            </div>
            <a href="https://t.me/taqdimot_robot?start=id_${item.id}" class="download-button" target="_blank">
                <i class="fas fa-download download-icon"></i>
            </a>
        `;

        resultDiv.appendChild(itemDiv); // Append item card directly with download link included
    });
}

function managePagination(itemCount) {
    const nextPageButton = document.getElementById('nextPageButton');
    const prevPageButton = document.getElementById('prevPageButton');
    
     // Show next page button only if there are more items
     if (itemCount === 10) { // Assuming API returns 10 items per page
         nextPageButton.classList.remove('hidden');
     } else {
         nextPageButton.classList.add('hidden');
     }

     // Show previous page button only if on page greater than 1
     if (currentPage > 1) {
         prevPageButton.classList.remove('hidden');
     } else {
         prevPageButton.classList.add('hidden');
     }
}


// Handle URL parameters on page load to allow sharing functionality
window.onload = function() { 
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const q = urlParams.get('q');
    const page = urlParams.get('page');

    
    if (category && q) { 
        document.getElementById('categorySelect').value = category === "pptx" ? "taqdimotlar" : "referatlar"; 
        document.getElementById('searchInput').value = q.trim(); 
        currentPage = page ? parseInt(page) : currentPage;

        fetchResults(q, category, currentPage); // Fetch results based on parameters
    }
};

// Toggle dark mode
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Toggle the dark-mode class on body

    // Change icon based on mode
    const moonIcon = darkModeToggle.querySelector('.fa-moon');
    const sunIcon = darkModeToggle.querySelector('.fa-sun');
    
    if (document.body.classList.contains('dark-mode')) {
          moonIcon.classList.replace("fa-moon", "fa-sun"); // Change to sun icon
          moonIcon.title = "Switch to light mode"; // Optional title attribute
      } else {
          sunIcon.classList.replace("fa-sun", "fa-moon"); // Change back to moon icon
          sunIcon.title = "Switch to dark mode"; // Optional title attribute
      }
});


