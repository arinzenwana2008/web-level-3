document.addEventListener("DOMContentLoaded", () => {

    console.log("JS is working");

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
});
