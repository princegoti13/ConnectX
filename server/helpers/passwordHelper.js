/**
 * ---------------------------------------
 * Project : ConnectX
 * File : passwordHelper.js
 * Purpose : Password Helper
 * Author : Prince Goti
 * ---------------------------------------
 */

const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
