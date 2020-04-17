const Customer = require('../models/Customer');

exports.getById = async id => {
  return await Customer.findOne({ _id: id });
};

exports.getByEmail = async email => {
  return await Customer.findOne({ email });
};

exports.list = async () => {
  return await Customer.find({});
};

exports.create = async customer => {
  const { name, email, telephone } = customer;
  return await Customer.create({
    name,
    email,
    telephone,
  });
};

exports.edit = async data => {
  await Customer.findOneAndUpdate(
    { _id: data.id },
    {
      $set: {
        name: data.name,
        email: data.email,
        telephone: data.telephone,
      },
    }
  );
  return await this.getById(data.id);
};
