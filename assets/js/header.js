function toogleMenuMobile() {
    document.querySelector('#nav-mobile').classList.toggle('d-none');
    document.querySelector('body').classList.toggle('overflow-hidden');
    window.scrollTo(0, 0);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#nav-mobile").querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", function(event) {
            event.stopPropagation();

            // Basculer l'affichage du sous-menu
            const submenu = item.querySelector(".sub-menu");
            const a = item.querySelector("a");
            if (submenu) {
                submenu.classList.toggle("open");
                a.classList.toggle("active-mobile");
                item.classList.toggle("open-li");
            }
        });
    });

    // Fermer le menu si on clique ailleurs sur la page
    document.addEventListener("click", function() {
        document.querySelectorAll(".sub-menu").forEach(sub => {
            sub.classList.remove("open");
        });
    });
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollThreshold = 20;

    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});