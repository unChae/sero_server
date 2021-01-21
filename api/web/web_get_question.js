// models
const model = require('../../models');
const Question = model.question;
const Category = model.category;
const User = model.user;

// utils
const response = require('../util/util_response');

module.exports = async (req, res) => {
  console.log(['web_get_question']);
  let question = await Question.findAll({
    where: {      
      quParentId: 0,
    },
    include: [
      {model: Category},
      {
        model: User,
        attributes: ['usName', 'usPhoto'],
      }
    ],
    order: [['createdAt','DESC']],
  })
  .catch(error => {
    response(res, 500, '[web_get_question] server error.', error);
    return;
  });
  for(var idx in question){
    question[idx].dataValues.answer = await Question.findAll({
      where: {quParentId : question[idx].dataValues.quId},
      include: [{
        model: User,
        attributes: ['usName', 'usPhoto', 'usGrant'],
      }],
    })
    .catch(error => {
      response(res, 500, '[web_get_question] server error.', error);
      return;
    });
  }
  for(var idx in question){
    question[idx].dataValues.answer.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
  }
  response(res, 200, '[web_get_question] success.', question);
};
    

