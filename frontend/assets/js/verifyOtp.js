/*
---------------------------------------
Project : ConnectX
File : verifyOtp.js
Purpose : Verify OTP
Author : Prince Goti
---------------------------------------
*/

const verifyForm = document.querySelector("#verifyOtpForm");

if (verifyForm) {
  verifyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("resetEmail");

    const otp = document.querySelector("#otp").value.trim();

    if (!otp) {
      alert("Please Enter OTP.");

      return;
    }

    const button = document.querySelector(".login-btn");

    button.disabled = true;

    button.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Verifying...
        `;

    try {
      const response = await fetch(API.verifyOtp, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,

          otp,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);

        window.location.href = "reset-password.html";
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);

      alert("Server Error");
    } finally {
      button.disabled = false;

      button.innerHTML = "Verify OTP";
    }
  });
}
