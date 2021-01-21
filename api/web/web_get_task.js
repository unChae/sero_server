// models
const model = require('../../models');
const Send = model.send;
const Post = model.post;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// utils
const response = require('../util/util_response');

module.exports = async (req, res) => {
  console.log(['web_get_task']);
  console.log(req.body)
  let {searchText, target, taskState} = req.body;
  let task = []
  switch (target) {
    case 0:
      task = await Send.findAll({
        include: [{model: Post}],
        order: [['createdAt','DESC']],
      })
      .catch(error => {
        response(res, 500, '[web_get_task] server error.', error);
        return;
      });
      break;
    case 1:
      task = await Send.findAll({
        where: {
          seId: searchText,
        },
        include: [{model: Post}],
        order: [['createdAt','DESC']],
      })
      .catch(error => {
        response(res, 500, '[web_get_task] server error.', error);
        return;
      });
      break;
    case 2:
      task = await Send.findAll({
      where: {
        [Op.or]: [
          {seAddress: {[Op.like]: '%' + searchText + '%'},},
          {seAddressDetail: {[Op.like]: '%' + searchText + '%'},},
        ],
      },
        include: [{model: Post}],
        order: [['createdAt','DESC']],
      })
      .catch(error => {
        response(res, 500, '[web_get_task] server error.', error);
        return;
      });
      break;
    default:
      break;
  }
  let _task = []
  for(let post of task){
    for(let state of taskState){
      if(post.seStatus == state){
        _task.push(post);
      }
    }
  }
  response(res, 200, "[web_get_task] success.", _task);
};
    
