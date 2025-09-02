//function toggleResponsiveMenu() {
//  const menu = document.querySelector('.navbar');
//  menu.classList.toggle('active');
//}
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("mobile-toggle");
    const navbar = document.getElementById("navbar");
    console.log(toggle)
    console.log('woeifjwoefijwoefij')
    toggle.addEventListener("click", () => {
      alert(' clicooooou')
      navbar.classList.toggle("active");
    });
  });