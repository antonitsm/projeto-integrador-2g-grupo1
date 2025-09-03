document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.getElementById("mobile-toggle")
  const navbar = document.getElementById("navbar")

  // Verificar se os elementos existem antes de adicionar event listeners
  if (mobileMenuToggle && navbar) {
    mobileMenuToggle.addEventListener("click", () => {
      navbar.classList.toggle("active")
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
  }

  // Event listener para scroll (independente do menu mobile)
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header")
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    }
  })
})

