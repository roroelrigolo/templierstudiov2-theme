document.addEventListener("DOMContentLoaded", function () {

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.4
    });

    const elements = document.querySelectorAll('[class*="an-custom"]');
    elements.forEach(el => {
        observer.observe(el);
    });

});