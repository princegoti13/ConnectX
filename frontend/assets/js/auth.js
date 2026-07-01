/*
---------------------------------------
Project : ConnectX
File : auth.js
Purpose : Login & Register Page
Author : Prince Goti
---------------------------------------
*/

console.log("auth.js Loaded");

// ================================
// Password Show / Hide
// ================================

const togglePassword = document.querySelector(".togglePassword");
const passwordInput = document.querySelector("#password");

if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";

      togglePassword.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      passwordInput.type = "password";

      togglePassword.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
}

// ================================
// Login
// ================================

const loginForm = document.querySelector("#loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    console.log("Login Button Clicked");
    e.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (!email || !password) {
      alert("Please Fill All Fields");
      return;
    }

    const button = document.querySelector(".login-btn");

    button.disabled = true;
    button.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Logging In...';

    try {
      const response = await fetch(API.login, {
        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log("Response Status:", response.status);

      const result = await response.json();

      console.log(result);

      if (result.success) {
        alert(result.message);

        window.location.href = "home.html";
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);

      alert("Server Error");
    } finally {
      button.disabled = false;
      button.innerHTML = "Login";
    }
  });
}

// ================================
// Register
// ================================

const registerForm = document.querySelector("#registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.querySelector("#firstName").value.trim();
    const lastName = document.querySelector("#lastName").value.trim();
    const username = document.querySelector("#username").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
    const confirmPassword = document
      .querySelector("#confirmPassword")
      .value.trim();

    console.log({
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
    });

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please Fill All Fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password And Confirm Password Do Not Match.");
      return;
    }

    const button = document.querySelector(".login-btn");

    button.disabled = true;
    button.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';

    try {
      const response = await fetch(API.register, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password,
          confirmPassword,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);

        window.location.href = "login.html";
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);

      alert("Server Error");
    } finally {
      button.disabled = false;
      button.innerHTML = "Create Account";
    }
  });
}
