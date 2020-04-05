const Image = require('../models/Image');

exports.create = async data => {
  const { base64, refId } = data;
  return await Image.create({
    base64,
    refId,
  });
};
