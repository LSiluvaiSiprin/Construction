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

    // ✅ Check login status from localStorage
    if (localStorage.getItem("isLoggedIn") === "true") {
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
    }

    // ✅ When user clicks Login
    loginBtn.addEventListener("click", () => {
      alert("You are now logged in!");
      localStorage.setItem("isLoggedIn", "true");
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
    });

    // ✅ When user clicks Logout
    logoutBtn.addEventListener("click", () => {
      alert("You are logged out!");
      localStorage.removeItem("isLoggedIn");
      logoutBtn.style.display = "none";
      loginBtn.style.display = "inline-block";
    });