window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

function openModal() {
  document.getElementById("consultationModal").style.display = "block";
}
function closeModal() {
  document.getElementById("consultationModal").style.display = "none";
}

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("open");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("open");
      });
    });

    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    // Check if elements exist before manipulating them
    if (loginBtn && logoutBtn) {
      // ✅ Check login status from localStorage
      if (localStorage.getItem("isLoggedIn") === "true") {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
      }

      // ✅ When user clicks Login
      loginBtn.addEventListener("click", () => {
        // Redirect to login page instead of fake login
        window.location.href = "index.html";
      });

      // ✅ When user clicks Logout
      logoutBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to logout?")) {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("userEmail");
          logoutBtn.style.display = "none";
          loginBtn.style.display = "inline-block";
          window.location.href = "index.html";
        }
      });
    }

    // Handle contact form submission
    const contactForm = document.querySelector('.get-in-touch-section form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const firstName = document.getElementById('fullName').value;
        const lastName = document.getElementById('lastName').value;
        const phone = document.getElementById('phoneNumber').value;
        const email = document.getElementById('emailAddress').value;
        const service = document.getElementById('service').value;
        const details = document.getElementById('projectDetails').value;
        
        // Basic validation
        if (!firstName || !lastName || !phone || !email || service === 'Select a service') {
          alert('Please fill in all required fields');
          return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address');
          return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(phone)) {
          alert('Please enter a valid phone number');
          return;
        }
        
        alert('Thank you for your inquiry! We will contact you within 24 hours.');
        contactForm.reset();
      });
    }