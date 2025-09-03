document.addEventListener("DOMContentLoaded", () => {
  console.log("Header carregado!")

  const mobileToggle = document.getElementById("mobile-toggle")
  const navbar = document.getElementById("navbar")
  const header = document.querySelector("header")
  const navLinks = navbar.querySelectorAll("a")

  // Toggle menu mobile
  mobileToggle.addEventListener("click", () => {
    mobileToggle.classList.toggle("active")
    navbar.classList.toggle("active")
  })

  // Efeito scroll no header
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Destaque do link ativo e fechamento do menu mobile
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Remove active de todos os links
      navLinks.forEach((l) => l.classList.remove("active"))

      // Adiciona active ao link clicado
      link.classList.add("active")

      // Se for link interno (hash) rola para a seção
      if (link.hash) {
        const target = document.querySelector(link.hash)
        if (target) {
          target.scrollIntoView({ behavior: "smooth" })
        }
      }

      // Fecha menu mobile
      if (navbar.classList.contains("active")) {
        navbar.classList.remove("active")
        mobileToggle.classList.remove("active")
      }
    })
  })

  // Fechar menu ao clicar fora
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && !mobileToggle.contains(e.target)) {
      navbar.classList.remove("active")
      mobileToggle.classList.remove("active")
    }
  })
})