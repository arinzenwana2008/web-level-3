document.addEventListener("DOMContentLoaded", () => {

    console.log("JS is working");

    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");
    let nextBtn = document.querySelector(".next");
    let prevBtn = document.querySelector(".prev");

    let currentIndex = 0;
    let autoPlayInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        slides[index].classList.add("active");
        dots[index].classList.add("active");
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
});



