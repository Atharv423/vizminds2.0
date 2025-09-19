'use strict';

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Background Music Control ---
    const muteBtn = document.getElementById('mute-btn');
    const bgMusic = document.getElementById('background-music');
    
    if (muteBtn && bgMusic) {
        bgMusic.volume = 0.3; // Set a pleasant volume
        let isPlaying = false;

        const toggleMusic = () => {
            isPlaying = !isPlaying;
            if (isPlaying) {
                bgMusic.play();
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                bgMusic.pause();
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        };

        muteBtn.addEventListener('click', toggleMusic);

        // Try to autoplay music, but handle browser restrictions gracefully.
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Autoplay started!
                isPlaying = true;
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }).catch(() => {
                // Autoplay was blocked. The user must click the button to start.
                isPlaying = false;
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            });
        }
    }

    // --- 2. Dynamic Fade-in on Scroll ---
    // This is a more efficient and modern way to handle scroll animations.
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // When an element is 15% visible, trigger the animation.
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.15 // An element is "visible" when 15% of it is in view
    });

    // Find all elements that should fade in and have the observer watch them.
    const elementsToFadeIn = document.querySelectorAll('.fade-in-on-scroll');
    elementsToFadeIn.forEach(element => {
        scrollObserver.observe(element);
    });

});