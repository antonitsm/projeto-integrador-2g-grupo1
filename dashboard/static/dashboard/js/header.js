//function toggleResponsiveMenu() {
//  const menu = document.querySelector('.navbar');
//  menu.classList.toggle('active');
//}
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("mobile-toggle");
    const navbar = document.getElementById("navbar");

    toggle.addEventListener("click", () => {
      navbar.classList.toggle("active");
    });
  });