// models
const model = require('../../../models');
const Question = model.question;
const Category = model.category;
const User = model.user;

// utils
const response = require('../../util/util_response');

module.exports = async (req, res) => {
  console.log(['app_get_question']);
  let question = await Question.findAll({
    where: {      
      quParentId: 0,
    },
    include: [{model: Category}],
    order: [['createdAt','DESC']],
  })
  .catch(error => {
    response(res, 500, '[app_get_question] server error.', error);
    return;
  });
  for(var idx in question){
    question[idx].dataValues.question = await Question.findAll({
      where: {quParentId : question[idx].dataValues.quId},
      include: [{
        model: User,
        attributes: [ 'usName', 'usPhoto' ],
      }],
    })
    .catch(error => {
      response(res, 500, '[app_get_question] server error.', error);
      return;
    });
  }
  for(var idx in question){
    question[idx].dataValues.question.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
  }
  response(res, 200, '[app_get_question] success.', question);
};
    