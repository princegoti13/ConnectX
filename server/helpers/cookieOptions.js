/**
 * ---------------------------------------
 * Project : ConnectX
 * File : cookieOptions.js
 * Purpose : Cookie Configuration
 * Author : Prince Goti
 * ---------------------------------------
 */

const cookieOptions = {
  httpOnly: true,
  secure: false, // true after HTTPS deployment
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

module.exports = cookieOptions;
