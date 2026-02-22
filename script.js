
document.addEventListener("DOMContentLoaded", () => {

    const menu = document.querySelector(".nav-links");
    const hamburger = document.querySelector(".hamburger");
    const navbar = document.querySelector(".navbar");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");
    const openResumeViewerBtn = document.getElementById("open-resume-viewer");
    const resumeViewer = document.getElementById("resume-viewer");
    const closeResumeViewerBtn = document.getElementById("close-resume-viewer");

    const closeResumeViewer = () => {
        if (!resumeViewer) return;
        resumeViewer.classList.remove("active");
        document.body.classList.remove("no-scroll");
    };

    if (openResumeViewerBtn && resumeViewer) {
        openResumeViewerBtn.addEventListener("click", (e) => {
            e.preventDefault();
            resumeViewer.classList.add("active");
            document.body.classList.add("no-scroll");
        });
    }

    if (closeResumeViewerBtn) {
        closeResumeViewerBtn.addEventListener("click", closeResumeViewer);
    }

    if (resumeViewer) {
        resumeViewer.addEventListener("click", (e) => {
            if (e.target === resumeViewer) {
                closeResumeViewer();
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && resumeViewer?.classList.contains("active")) {
            closeResumeViewer();
        }
    });

    if (hamburger && menu) {

        hamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            menu.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (
                menu.classList.contains("active") &&
                !menu.contains(e.target) &&
                !hamburger.contains(e.target)
            ) {
                menu.classList.remove("active");
            }
        });
    }


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            menu?.classList.remove("active");
        });

    });

    if (navbar) {

        window.addEventListener("scroll", () => {

            navbar.style.backgroundColor =
                window.scrollY > 50
                    ? "rgba(10,10,10,0.98)"
                    : "rgba(10,10,10,0.95)";

            let current = "";

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                const sectionHeight = section.offsetHeight;

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + current) {
                    link.classList.add("active");
                }
            });

        });
    }

    const timelineItems = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => observer.observe(item));

    window.openPopup = function (imgSrc) {
        const popup = document.getElementById("popup");
        const popupImg = document.getElementById("popup-img");
        if (popup && popupImg) {
            popupImg.src = imgSrc;
            popup.style.display = "flex";
        }
    };

    window.closePopup = function () {
        const popup = document.getElementById("popup");
        if (popup) popup.style.display = "none";
    };

    const typingElement = document.getElementById("typing-text");

    if (typingElement) {

        const texts = [
            "Coder.",
            "MERN Stack Developer.",
            "Node.js Developer.",
            "Tech Enthusiast."
        ];

        let count = 0;
        let index = 0;

        function typeEffect() {
            const current = texts[count];
            typingElement.textContent = current.slice(0, ++index);

            if (index < current.length) {
                setTimeout(typeEffect, 100);
            } else {
                setTimeout(deleteEffect, 1500);
            }
        }

        function deleteEffect() {
            const current = texts[count];
            typingElement.textContent = current.slice(0, --index);

            if (index > 0) {
                setTimeout(deleteEffect, 60);
            } else {
                count = (count + 1) % texts.length;
                setTimeout(typeEffect, 500);
            }
        }

        typeEffect();
    }

});

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");
    const text = document.querySelector(".loader-text");
    const sound = document.getElementById("loaderSound");

    if (!preloader || !text) return;

    if (sound) {
        sound.volume = 0.4;
        sound.play().catch(() => {});
    }

    let count = 0;

    const interval = setInterval(() => {

        count++;
        text.textContent = count + "%";

        if (count >= 100) {

            clearInterval(interval);

            document.body.classList.add("loaded");

            if (sound) {
                sound.pause();
                sound.currentTime = 0;
            }

            setTimeout(() => {
                preloader.style.display = "none";
            }, 2200);
        }

    }, 15);

});
