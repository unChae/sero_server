// models
const model = require("../../models");
const Question = model.question;

// utils
const response = require('../util/util_response');

module.exports = async (req,res) => {
  console.log(['web_set_question']);
  let {usId, quCaId, quContent, quParentId} = req.body;
  let question = await Question.create({
    quUsId: usId,
    quCaId,
    quContent,
    quParentId,
  })
  .catch(error => {
    response(res, 500, '[web_set_question] server error.', error);
    return;
  });
  response(res, 200, '[web_set_question] success.', question);
  return;
};