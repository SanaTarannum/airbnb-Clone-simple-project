  const form = document.querySelector("form");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  form.addEventListener("submit", function (e) {
    let isValid = true;

    // Reset all messages
    ["username", "email", "password"].forEach((field) => {
      document.getElementById(field + "Error").innerText = "";
      document.getElementById(field + "Success").classList.add("hidden");
    });

    // Username validation
    if (username.value.trim() === "") {
      document.getElementById("usernameError").innerText = "Username is required.";
      isValid = false;
    } else {
      document.getElementById("usernameSuccess").classList.remove("hidden");
    }

    // Email validation
    if (email.value.trim() === "") {
      document.getElementById("emailError").innerText = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
      document.getElementById("emailError").innerText = "Email is invalid.";
      isValid = false;
    } else {
      document.getElementById("emailSuccess").classList.remove("hidden");
    }

    // Password validation
    if (password.value.trim().length < 6) {
      document.getElementById("passwordError").innerText = "Password must be at least 6 characters.";
      isValid = false;
    } else {
      document.getElementById("passwordSuccess").classList.remove("hidden");
    }

    if (!isValid) {
      e.preventDefault();
    }
  });
