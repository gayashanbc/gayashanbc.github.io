// ============================================
// Modern Portfolio JavaScript
// ============================================

(function() {
  'use strict';

  // ============================================
  // Typing Animation
  // ============================================
  const typingTexts = [
    'Programmer',
    'Blogger',
    'Keyboard Enthusiast',
    'Software Engineer',
    'GSoC Contributor'
  ];

  let currentTextIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById('typing-text');

  function typeText() {
    if (!typingElement) return;

    const currentText = typingTexts[currentTextIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
      currentCharIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
      currentCharIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentCharIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
      typeSpeed = 500; // Pause before starting new word
    }

    setTimeout(typeText, typeSpeed);
  }

  // Start typing animation after a delay
  if (typingElement) {
    setTimeout(typeText, 1000);
  }

  // ============================================
  // Navigation
  // ============================================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Navbar scroll effect
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');

  function setActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNavLink);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // Scroll to Top Button
  // ============================================
  const scrollToTopBtn = document.getElementById('scrollToTop');

  function toggleScrollToTop() {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleScrollToTop);

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ============================================
  // Contact Form
  // ============================================
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('form-message');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      // Simple validation
      if (!name || !email || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
      }

      // Create mailto link (since we can't send emails directly from static site)
      const subject = encodeURIComponent(`Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoLink = `mailto:gayashan@gayashan.net?subject=${subject}&body=${body}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show success message
      showFormMessage('Thank you! Your email client should open shortly.', 'success');
      
      // Reset form
      contactForm.reset();
    });
  }

  function showFormMessage(message, type) {
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.className = 'form-message';
      formMessage.textContent = '';
    }, 5000);
  }

  // ============================================
  // Intersection Observer for Animations
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for fade-in animation
  const animateElements = document.querySelectorAll('.skill-category, .achievement-card, .about-text, .contact-method');
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ============================================
  // Set Current Year
  // ============================================
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // ============================================
  // Performance: Lazy load images
  // ============================================
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

})();

