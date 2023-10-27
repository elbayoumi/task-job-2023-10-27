    const slider = document.querySelector('.slider');
    let counter = 0;

    function nextSlide() {
        if (counter < (slider.children.length - 1)) {
            counter++;
        } else {
            counter = 0;
        }
        updateSlider();
    }

    function prevSlide() {
        if (counter > 0) {
            counter--;
        } else {
            counter = slider.children.length - 1;
        }
        updateSlider();
    }

    function updateSlider() {
        const slideWidth = slider.clientWidth;
        slider.style.transform = `translateX(${-counter * slideWidth}px)`;
    }

    // Event listeners for navigation
    document.querySelector('.prev-btn').addEventListener("click", prevSlide);
    document.querySelector('.next-btn').addEventListener("click", nextSlide);
