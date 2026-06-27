/**
 * ---------------------------------------
 * Project : ConnectX
 * File : asyncHandler.js
 * Purpose : Async Error Handler
 * Author : Prince Goti
 * ---------------------------------------
 */

const asyncHandler = (callback) => {
  return (req, res, next) => {
    Promise.resolve(callback(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;
