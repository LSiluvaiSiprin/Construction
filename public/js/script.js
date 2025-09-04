// Show Login & Signup toggle
function showSignup() {
  document.getElementById("login-box").classList.add("hidden");
  document.getElementById("signup-box").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("signup-box").classList.add("hidden");
  document.getElementById("login-box").classList.remove("hidden");
}

// Error display function
function showError(message, formType = 'login') {
  // Remove existing error messages
  const existingError = document.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  // Create error element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.cssText = `
    background: #fee2e2;
    color: #dc2626;
    padding: 12px;
    border-radius: 6px;
    margin: 10px 0;
    border: 1px solid #fecaca;
    font-size: 14px;
    text-align: center;
  `;
  errorDiv.textContent = message;

  // Insert error message
  const targetForm = formType === 'signup' ? 
    document.getElementById('signupForm') : 
    document.getElementById('loginForm');
  
  if (targetForm) {
    targetForm.insertBefore(errorDiv, targetForm.firstChild);
    
    // Auto-remove error after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  }
}

// Success message function
function showSuccess(message, formType = 'login') {
  const existingSuccess = document.querySelector('.success-message');
  if (existingSuccess) {
    existingSuccess.remove();
  }

  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.style.cssText = `
    background: #dcfce7;
    color: #16a34a;
    padding: 12px;
    border-radius: 6px;
    margin: 10px 0;
    border: 1px solid #bbf7d0;
    font-size: 14px;
    text-align: center;
  `;
  successDiv.textContent = message;

  const targetForm = formType === 'signup' ? 
    document.getElementById('signupForm') : 
    document.getElementById('loginForm');
  
  if (targetForm) {
    targetForm.insertBefore(successDiv, targetForm.firstChild);
    
    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.remove();
      }
    }, 3000);
  }
}

// Enhanced form validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateUsername(username) {
  return username.length >= 5 && username.length <= 50;
}

// LOGIN - send to backend
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      // Get form elements
      const emailInput = document.getElementById("loginEmail");
      const passwordInput = document.getElementById("loginPassword");
      
      if (!emailInput || !passwordInput) {
        showError("Form elements not found. Please refresh the page.");
        return;
      }

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      // Enhanced validation
      if (!email || !password) {
        showError("Please fill in all fields");
        return;
      }

      if (!validateEmail(email)) {
        showError("Please enter a valid email address");
        return;
      }

      if (!validatePassword(password)) {
        showError("Password must be at least 6 characters long");
        return;
      }

      // Show loading state
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Logging in...';
      submitBtn.disabled = true;

      try {
        const res = await fetch("/auth/login", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        
        if (res.ok) {
          showSuccess("Login successful! Redirecting...");
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userEmail", email);
          
          // Redirect after short delay
          setTimeout(() => {
            window.location.href = "main.html";
          }, 1000);
        } else {
          showError(data.msg || "Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Login error:", error);
        showError("Network error. Please check your connection and try again.");
      } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // SIGNUP - send to backend
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const usernameInput = document.getElementById("signupUsername");
      const emailInput = document.getElementById("signupEmail");
      const passwordInput = document.getElementById("signupPassword");

      if (!usernameInput || !emailInput || !passwordInput) {
        showError("Form elements not found. Please refresh the page.", 'signup');
        return;
      }

      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      // Enhanced validation
      if (!username || !email || !password) {
        showError("Please fill in all fields", 'signup');
        return;
      }

      if (!validateUsername(username)) {
        showError("Username must be between 5 and 50 characters", 'signup');
        return;
      }

      if (!validateEmail(email)) {
        showError("Please enter a valid email address", 'signup');
        return;
      }

      if (!validatePassword(password)) {
        showError("Password must be at least 6 characters long", 'signup');
        return;
      }

      // Show loading state
      const submitBtn = signupForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Creating account...';
      submitBtn.disabled = true;

      try {
        const res = await fetch("/auth/signup", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();
        
        if (res.ok) {
          showSuccess("Account created successfully! Please login.", 'signup');
          
          // Clear form and switch to login after delay
          setTimeout(() => {
            signupForm.reset();
            showLogin();
          }, 2000);
        } else {
          showError(data.msg || "Signup failed. Please try again.", 'signup');
        }
      } catch (error) {
        console.error("Signup error:", error);
        showError("Network error. Please check your connection and try again.", 'signup');
      } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});

// Add global error handler for uncaught errors
window.addEventListener('error', function(e) {
  console.error('Global error:', e.error);
});

// Add handler for unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
});