document.addEventListener('DOMContentLoaded', function () {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navbar = document.querySelector('.navbar');

    if (mobileToggle && navbar) {
        mobileToggle.addEventListener('click', function () {
            mobileToggle.classList.toggle('active');
            navbar.classList.toggle('active');
        });
    }

    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
});
