document.addEventListener("DOMContentLoaded", function () {
    const classes = ["anim-slide-b-t", "anim-slide-l-r", "anim-slide-r-l"];

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    classes.forEach(className => {
        document.querySelectorAll(`.${className}`).forEach(el => observer.observe(el));
    });
});