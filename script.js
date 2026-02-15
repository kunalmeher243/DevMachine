document.addEventListener("DOMContentLoaded", function () {

    const menu = document.querySelector(".nav-links")
    const hamburger = document.querySelector(".hamburger")
    const navbar = document.querySelector(".navbar")
    const typingElement = document.getElementById("typing-text")

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()

            const target = document.querySelector(this.getAttribute('href'))

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }

            menu.classList.remove("active")
        })
    })

    window.addEventListener('scroll', () => {
        navbar.style.backgroundColor = window.scrollY > 50
            ? 'rgba(10,10,10,0.98)'
            : 'rgba(10,10,10,0.95)'
    })

    function toggleMenu() {
        menu.classList.toggle("active")
    }

    hamburger.addEventListener("click", toggleMenu)

    document.addEventListener("click", function (e) {
        if (
            menu.classList.contains("active") &&
            !menu.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            menu.classList.remove("active")
        }
    })

    window.openPopup = function (imgSrc) {
        document.getElementById("popup-img").src = imgSrc
        document.getElementById("popup").style.display = "flex"
    }

    window.closePopup = function () {
        document.getElementById("popup").style.display = "none"
    }

    const texts = [
        "Coder.",
        "MERN Stack Developer.",
        "Node.js Developer."
    ]

    let count = 0
    let index = 0
    let currentText = ""
    let letter = ""

    function typeEffect() {

        if (count === texts.length) {
            count = 0
        }

        currentText = texts[count]
        letter = currentText.slice(0, ++index)

        typingElement.textContent = letter

        if (letter.length < currentText.length) {
            setTimeout(typeEffect, 100)
        } else {
            setTimeout(deleteEffect, 1500)
        }
    }

    function deleteEffect() {

        letter = currentText.slice(0, --index)
        typingElement.textContent = letter

        if (letter.length > 0) {
            setTimeout(deleteEffect, 60)
        } else {
            count++
            index = 0
            setTimeout(typeEffect, 500)
        }
    }

    typeEffect()

})
