// models
const model = require("../../../models");
const Question = model.question;

// utils
const response = require('../../util/util_response');

module.exports = async (req,res) => {
  console.log(['app_set_question']);
  let {quSeId, usId, quCaId, quContent, quParentId} = req.body;
  if(quSeId == 0){
    quSeId = null;
  }
  let question = await Question.create({
    quSeId,
    quUsId: usId,
    quCaId,
    quContent,
    quParentId,
  })
  .catch(error => {
    response(res, 500, '[app_set_question] server error.', error);
    return;
  });
  response(res, 200, '[app_set_question] success.', question);
  return;
};