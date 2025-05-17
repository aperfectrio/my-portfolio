document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const errorDiv = document.getElementById('formError');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); 
      let errors = [];

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Name validation
      if (name.length < 2) {
        errors.push('Name must be at least 2 characters.');
      }

      // Email validation 
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errors.push('Please enter a valid email address.');
      }

      // Message validation
      if (message.length < 10) {
        errors.push('Message must be at least 10 characters.');
      }

      if (errors.length > 0) {
        errorDiv.innerHTML = errors.join('<br>');
      } else {
        errorDiv.style.color = "green";
        errorDiv.innerHTML = "Your message has been sent.";
        form.reset();
      }
    });
  }

  // Back-to-top button functionality
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 200) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Hamburger menu functionality
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    // Optional: close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
});