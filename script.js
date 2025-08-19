// ===== Coca-Cola Website JavaScript =====

// --- Variables for the image slider ---
const canImages = [
  "images/zoe-os-StYtN5mo-unsplash.jpg",
  "images/vitalii-khodzinskyi-PaTtPJPZED4-unsplash.jpg",
  "images/tobi-4DJ6m_1V71o-unsplash.jpg",
  "images/qasim-malick-tDU7_HgwdlI-unsplash.jpg",
  "images/peyman-ahmadi-LNfQuWtLadI-unsplash.jpg",
  "images/nikhil-pillai-PuISZLkKjjs-unsplash.jpg",
  "images/mahdi-aminrad-91KH4Fun9lc-unsplash.jpg",
  "images/mahbod-akhzami-VM6uuMFPIGM-unsplash.jpg",
  "images/mae-mu-z8PEoNIlGlg-unsplash.jpg",
  "images/james-yarema-wQFmDhrvVSs-unsplash.jpg",
  "images/homescreenify-RMWRLnkZTTQ-unsplash.jpg",
  "images/easylife-designs-OWyCbCn28Hg-unsplash.jpg",
  "images/coca cola flavours.jpg",
  "images/chris-barbalis-afrfDWk07X8-unsplash.jpg",
  "images/ayesha-ch-S24Sq0Vc0ms-unsplash.jpg",
  "images/abolfazl-ranjbar-uaNoIlReiWc-unsplash.jpg",
  "images/360_F_308550245_VvY54tCzjg1cN8jLqr6iikH3VS71Xbvs.jpg"
];

let currentIndex = 0;

// Render the slider images with correct classes
function renderSlider() {
  const sliderTrack = document.querySelector('.slider-track');
  if (!sliderTrack) return; // No slider on the page

  sliderTrack.innerHTML = '';

  const total = canImages.length;
  const leftIdx = (currentIndex - 1 + total) % total;
  const rightIdx = (currentIndex + 1) % total;

  function createImg(idx, className) {
    const img = document.createElement('img');
    img.src = canImages[idx];
    img.alt = `Coca-Cola can ${idx + 1}`;
    img.className = `slider-image ${className}`;
    return img;
  }

  sliderTrack.appendChild(createImg(leftIdx, 'left'));
  sliderTrack.appendChild(createImg(currentIndex, 'active'));
  sliderTrack.appendChild(createImg(rightIdx, 'right'));
}

// Slider navigation handlers
function slideLeft() {
  currentIndex = (currentIndex - 1 + canImages.length) % canImages.length;
  renderSlider();
}

function slideRight() {
  currentIndex = (currentIndex + 1) % canImages.length;
  renderSlider();
}

// DOMContentLoaded: Initialize all event handlers and features
document.addEventListener('DOMContentLoaded', () => {
  renderSlider();

  // Slider buttons
  const leftBtn = document.querySelector('.left-btn');
  const rightBtn = document.querySelector('.right-btn');
  if (leftBtn) leftBtn.addEventListener('click', slideLeft);
  if (rightBtn) rightBtn.addEventListener('click', slideRight);

  // Navbar scroll effect: change background and padding on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255, 0, 0, 0.9)';
      navbar.style.padding = '0.6rem 2rem';
    } else {
      navbar.style.background = 'rgba(255, 0, 0, 0.7)';
      navbar.style.padding = '1rem 3rem';
    }
  });

  // Smooth scrolling for navbar links
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });

  // Reveal animation on scroll using Intersection Observer
  const allSections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  allSections.forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
  });

  // Contact form submission feedback
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thank you for contacting Coca-Cola! We will get back to you soon.');
      contactForm.reset();
    });
  }

  // Newsletter form submission feedback
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('You have successfully subscribed to Coca-Cola updates!');
      newsletterForm.reset();
    });
  }

  // Scroll-to-top button creation and behavior
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '⬆';
  scrollBtn.classList.add('scroll-top-btn');
  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 600 ? 'flex' : 'none';
  });
});

// Navbar and hero-content hide/show on mobile scroll
let lastScrollTop = 0;
const hideThreshold = 50;
const navbar = document.querySelector('.navbar');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (window.innerWidth <= 768) {
    if (scrollTop > lastScrollTop && scrollTop > hideThreshold) {
      navbar && navbar.classList.add('hidden');
      heroContent && heroContent.classList.add('shrink');
    } else {
      navbar && navbar.classList.remove('hidden');
      heroContent && heroContent.classList.remove('shrink');
    }
  } else {
    navbar && navbar.classList.remove('hidden');
    heroContent && heroContent.classList.remove('shrink');
  }

  lastScrollTop = Math.max(scrollTop, 0);
});

// Hamburger menu toggle for mobile navigation
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !expanded);
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when a navigation link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }
});
