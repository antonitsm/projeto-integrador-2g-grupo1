document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.getElementById("mobile-toggle")
  const navbar = document.getElementById("navbar")

  mobileMenuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active")
  })

  window.addEventListener("scroll", () => {
    const header = document.querySelector("header")
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  const menuLinks = navbar.querySelectorAll("a")
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active")
    })
  })

  document.addEventListener("click", (event) => {
    if (!mobileMenuToggle.contains(event.target) && !navbar.contains(event.target)) {
      navbar.classList.remove("active")
    }
  })
})
