// models
const model = require("../../../models");
const Post = model.post;

// utils
const response = require('../../util/util_response');

module.exports = async (req, res) => {
  console.log(['app_set_post']);
  let {usId, poContent} = req.body;
  let files = req.files;
  let poPhoto;
  let poContentPhoto;
  for(let i = 0; i < files.poPhoto[0].transforms.length; i++){
    if(files.poPhoto[0].transforms[i].id == 'original'){
      poPhoto = files.poPhoto[0].transforms[i].location.split('https://seropost-data.s3.ap-northeast-2.amazonaws.com/')[1];
    }
  }
  for(let i = 0; i < files.poContentPhoto[0].transforms.length; i++){
    if(files.poContentPhoto[0].transforms[i].id == 'original'){
      poContentPhoto = files.poContentPhoto[0].transforms[i].location.split('https://seropost-data.s3.ap-northeast-2.amazonaws.com/')[1];
    }
  }
  let poRecord = 'null';
  if(files.poRecord != null){
    poRecord = files.poRecord[0].location.split('https://seropost-data.s3.ap-northeast-2.amazonaws.com/')[1];
  }
  let post = await Post.create({
    poUsId : usId,
    poContent: poContent.toString(),
    poPhoto,
    poContentPhoto,
    poRecord,
  })
  .catch(error => {
    response(res, 500, '[app_set_post] server error.', error);
    return;
  });
  response(res, 200, '[app_set_post] success.', post);
  return;
};
