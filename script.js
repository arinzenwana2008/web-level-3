document.addEventListener("DOMContentLoaded", () => {

    console.log("JS is working");

    // Define all pages available for search
    const pages = [
        { name: "Home", url: "index.html" },
        { name: "Team", url: "team.html" },
        { name: "Highlights", url: "Highlight.html" },
        { name: "Forums", url: "forums.html" },
        { name: "Contact", url: "contact.html" },
        { name: "Our products", url: "ourproducts.html" },
        { name: "Login", url: "login.html" },
        { name: "Sign Up", url: "signup.html" },
        { name: "Player", url: "player.html" }
    ];

    // Search functionality
    const searchInput = document.querySelector('.actions input[type="text"]');
    const searchContainer = document.querySelector('.actions');
    
    if (searchInput) {
        // Create search results dropdown if it doesn't exist
        if (!document.querySelector('.search-results')) {
            const searchResults = document.createElement('div');
            searchResults.className = 'search-results';
            searchContainer.insertBefore(searchResults, searchInput.nextSibling);
        }
        
        const searchResults = document.querySelector('.search-results');

        // Handle search input
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length === 0) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
                return;
            }

            // Filter pages based on search query
            const filtered = pages.filter(page => 
                page.name.toLowerCase().includes(query) || 
                page.url.toLowerCase().includes(query)
            );

            // Display results
            if (filtered.length > 0) {
                searchResults.innerHTML = filtered.map(page => 
                    `<a href="${page.url}" class="search-result-item">${page.name}</a>`
                ).join('');
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = '<div class="search-no-results">No pages found</div>';
                searchResults.style.display = 'block';
            }
        });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });

        // Show results on focus
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim().length > 0) {
                searchResults.style.display = 'block';
            }
        });
    }

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    let currentIndex = 0;
    let autoPlayInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        if (slides[index]) {
            slides[index].classList.add("active");
        }
        if (dots[index]) {
            dots[index].classList.add("active");
        }
    }

    function nextSlide() {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
        showSlide(currentIndex);
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    if (slides.length && dots.length && nextBtn && prevBtn) {
        // Manual navigation - Next button
        nextBtn.addEventListener("click", () => {
            nextSlide();
            startAutoPlay(); // Reset timer on manual interaction
        });

        // Manual navigation - Previous button
        prevBtn.addEventListener("click", () => {
            prevSlide();
            startAutoPlay(); // Reset timer on manual interaction
        });

        // Dot navigation - click to jump to specific slide
        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                currentIndex = index;
                showSlide(currentIndex);
                startAutoPlay(); // Reset timer on manual interaction
            });
        });

        // Auto-change slides every 4 seconds
        startAutoPlay();
    }

    const themeToggleBtn = document.getElementById("theme-toggle");

    function setTheme(theme) {
        const isDark = theme === "dark";
        document.body.classList.toggle("dark-theme", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
        if (themeToggleBtn) {
            themeToggleBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
        }
    }

    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme === "dark" ? "dark" : "light");

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const newTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
            setTheme(newTheme);
        });
    }

    // Handle signup and login form submissions with popup
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Determine which page we're on
            const currentPage = window.location.pathname;
            let message = '';
            
            if (currentPage.includes('signup.html')) {
                message = 'Thank you for signing up!';
            } else if (currentPage.includes('login.html')) {
                message = 'Thank you for logging in!';
            }
            
            if (message) {
                // Show popup alert
                alert(message);
                // Redirect to home page
                window.location.href = 'index.html';
            }
        });
    });
});
