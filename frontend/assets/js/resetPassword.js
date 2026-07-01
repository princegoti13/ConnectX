/*
---------------------------------------
Project : ConnectX
File : resetPassword.js
Purpose : Reset Password
Author : Prince Goti
---------------------------------------
*/

const resetForm = document.querySelector("#resetPasswordForm");

if (resetForm) {
  resetForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("resetEmail");

    const password = document.querySelector("#password").value.trim();

    const confirmPassword = document
      .querySelector("#confirmPassword")
      .value.trim();

    if (!password || !confirmPassword) {
      alert("Please Fill All Fields.");

      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords Do Not Match.");

      return;
    }

    const button = document.querySelector(".login-btn");

    button.disabled = true;

    button.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Resetting...
        `;

    try {
      const response = await fetch(API.resetPassword, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,

          password,

          confirmPassword,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);

        localStorage.removeItem("resetEmail");

        window.location.href = "login.html";
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);

      alert("Server Error");
    } finally {
      button.disabled = false;

      button.innerHTML = "Reset Password";
    }
  });
}
