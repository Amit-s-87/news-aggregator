require("dotenv").config();

const { JWT_SECRET, NEWSAPI_KEY} = process.env;

module.exports = { 
  JWT_SECRET,
  NEWSAPI_KEY,  
};