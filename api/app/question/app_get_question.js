// models
const model = require("../../../models");
const Question = model.question;
const User = model.user;
const Category = model.category;

// utils
const response = require('../../util/util_response');

module.exports = async (req,res) => {
  console.log(['app_get_question']);
  let {usId} = req.body;
  let question = await Question.findAll({
    raw: true,
    where: {      
      quUsId: usId,
      quParentId: 0,
    },
    include: [{model: Category}],
    order: [['createdAt','DESC']],
  })
  .catch(error => {
    response(res, 500, '[app_get_question] server error.', error);
    return;
  });
  console.log(question);
  for(var idx in question){
    question[idx].question = await Question.findAll({
      where: {quParentId : question[idx].quId},
      include: [{
        model: User,
        attributes: [ 'usName', 'usPhoto' ],
      }],
      order: [['createdAt','DESC']],
    })
    .catch(error => {
      response(res, 500, '[app_get_question] server error.', error);
      return;
    });
  }
  response(res, 200, '[app_get_question] success.', question);
};