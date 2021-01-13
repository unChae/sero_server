// modules
const bcrypt = require('bcrypt');

module.exports = {
  hashing: async (param) => {
    const result = await new Promise((resolve, reject) => {
      bcrypt.hash(param, 10, (error, hashed) => {
        if (error) {
          reject(error);
        }else {
          resolve(hashed);
        }
      }); 
    });
    return result;
  },
  compare: async (param1, param2) => {
    const result = await new Promise((resolve, reject) => {
      bcrypt.compare(param1, param2, (error, result) => {
        if(error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
    return result;
  }
}