// models
const model = require("../../../models");
const Category = model.category;

// utils
const response = require('../../util/util_response');

module.exports = async (req,res) => {
  console.log(['app_get_category']);
  let category = await Category.findAll()
  .catch(error => {
    response(res, 500, '[app_get_category] server error.', error);
    return;
  });
  response(res, 200, '[app_get_category] success.', category);
};