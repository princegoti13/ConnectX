/*
---------------------------------------
Project : ConnectX
File : api.js
Purpose : API Configuration
Author : Prince Goti
---------------------------------------
*/

const BASE_URL = "http://localhost:5000/api";

const API = {
  login: `${BASE_URL}/auth/login`,

  register: `${BASE_URL}/auth/register`,

  currentUser: `${BASE_URL}/auth/me`,
};
