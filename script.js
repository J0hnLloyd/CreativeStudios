document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const options = {
        root: null, // use the viewport as the container
        threshold: 0.1 // trigger when 10% of the target is visible
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetNumber = +counter.getAttribute('data-target');
                const duration = 2000; // Duration in milliseconds
                const frameDuration = 1000 / 60; // 60 frames per second
                const totalFrames = Math.round(duration / frameDuration);
                let frame = 0;

                const countTo = () => {
                    const progress = Math.min(frame / totalFrames, 1);
                    counter.textContent = Math.round(targetNumber * progress);

                    if (frame < totalFrames) {
                        frame++;
                        requestAnimationFrame(countTo);
                    }
                };

                requestAnimationFrame(countTo);
                observer.unobserve(counter); // Stop observing once the animation has started
            }
        });
    }, options);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});
