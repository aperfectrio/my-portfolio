document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const errorDiv = document.getElementById('formError');
  const backToTopBtn = document.getElementById('backToTop');

  // --- Restore from localStorage ---
  if (form) {
    const draft = JSON.parse(localStorage.getItem('contactFormDraft') || '{}');
    if (draft.name) form.elements['name'].value = draft.name;
    if (draft.email) form.elements['email'].value = draft.email;
    if (draft.message) form.elements['message'].value = draft.message;

    // --- Save draft on input ---
    form.addEventListener('input', function () {
      const draftData = {
        name: form.elements['name'].value,
        email: form.elements['email'].value,
        message: form.elements['message'].value
      };
      localStorage.setItem('contactFormDraft', JSON.stringify(draftData));
    });

    // --- Clear draft 
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let errors = [];

      const name = form.elements['name'].value.trim();
      const email = form.elements['email'].value.trim();
      const message = form.elements['message'].value.trim();

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
        localStorage.removeItem('contactFormDraft'); // Clear draft
      }
    });
  }

  // Back2top button functionality
  if (backToTopBtn) {
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
  }

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
          console.log('Hamburger clicked');
          navLinks.classList.toggle('open');
      });

      navLinks.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
              navLinks.classList.remove('open');
          });
      });
  }

  // Dynamic greeting 
  const greetingElement = document.getElementById('greeting');
  if (greetingElement) {
    const now = new Date();
    const hour = now.getHours();
    let greetingText = '';
    if (hour < 12) {
      greetingText = 'Good Morning!';
    } else if (hour < 18) {
      greetingText = 'Good Afternoon!';
    } else {
      greetingText = 'Good Evening!';
    }
    greetingElement.textContent = greetingText;
  }

  // Animate elements on scroll 
  const animatedEls = document.querySelectorAll('.animate-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.15 });

    animatedEls.forEach(el => observer.observe(el));
  } else {
    animatedEls.forEach(el => el.classList.add('visible'));
  }
});