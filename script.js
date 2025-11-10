 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    
      window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        navbar.style.backgroundColor = window.scrollY > 50
          ? 'rgba(10, 10, 10, 0.98)'
          : 'rgba(10, 10, 10, 0.95)';
      });

      function toggleMenu() {
        document.querySelector(".nav-links").classList.toggle("active");
      }
      
      function openCertificate(imgSrc) {
        let popup = document.getElementById("popup");
        let popupImg = document.getElementById("popup-img");
        popupImg.src = imgSrc;
        popup.style.display = "flex";
      }

      function openPopup(imgSrc) {
        document.getElementById("popup-img").src = imgSrc;
        document.getElementById("popup").style.display = "flex";
      }

      function closePopup() {
        document.getElementById("popup").style.display = "none";
      }