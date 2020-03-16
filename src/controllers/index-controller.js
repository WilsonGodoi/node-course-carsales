exports.get = (req, res, next) => {
  res.status(200).send({ title: "Node Store API", version: "1.0.0" });
};

exports.post = (req, res) => {
  console.log(req.body);
  if (req.body.name === "Wilson") {
    res.status(201).send(`Hello`);
  }
  return res.status(400).send({
    message: "This is an error!"
  });
};
