// models
const model = require("../../../models");
const Question = model.question;

// utils
const response = require('../../util/util_response');

module.exports = async (req,res) => {
  console.log(['app_del_question']);
  let {quId} = req.body;
  await Question.destroy({
    where : {quId}
  })
  .catch(error => {
    response(res, 500, '[app_get_category] server error.', error);
    return;
  });
  response(res, 200, '[app_del_question] success.', null);
};