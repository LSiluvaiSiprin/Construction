 // Show Login & Signup toggle
    function showSignup() {
      document.getElementById("login-box").classList.add("hidden");
      document.getElementById("signup-box").classList.remove("hidden");
    }
    function showLogin() {
      document.getElementById("signup-box").classList.add("hidden");
      document.getElementById("login-box").classList.remove("hidden");
    }

    // LOGIN - send to backend
    document.getElementById("loginForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      
      // Get form elements
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      // Basic validation
      if (!email || !password) {
        alert("Please fill in all fields");
        return;
      }

      try {
        const res = await fetch("/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        
        if (res.ok) {
          alert("Login successful!");
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userEmail", email);
          window.location.href = "main.html";
        } else {
          alert(data.msg || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Network error. Please check your connection and try again.");
      }
    });

    // SIGNUP - send to backend
    document.getElementById("signupForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const username = document.getElementById("signupUsername").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;

      // Basic validation
      if (!username || !email || !password) {
        alert("Please fill in all fields");
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
      }

      if (username.length < 5) {
        alert("Username must be at least 5 characters long");
        return;
      }

      try {
        const res = await fetch("/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();
        
        if (res.ok) {
          alert("Signup successful! Please login.");
          showLogin();
        } else {
          alert(data.msg || "Signup failed");
        }
      } catch (error) {
        console.error("Signup error:", error);
        alert("Network error. Please check your connection and try again.");
      }
    });