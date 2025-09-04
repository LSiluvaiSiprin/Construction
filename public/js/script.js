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
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      console.log(res,"silu");
      console.log(res.ok,"jemimah")

      const data = await res.json();
      console.log(data,"vaira muthu")
      if (res.ok) {
        alert("Login successful!");
        window.location.href = "main.html"; // redirect to dashboard
      } else {
        alert(data.msg || "Login failed");
      }
    });

    // SIGNUP - send to backend
    document.getElementById("signupForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("signupUsername").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;

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
    });