const customerRepository = require('../repository/customer-repository');

module.exports = {
  async create(req, res) {
    try {
      const { name, email, telephone } = req.body;
      const customer = { name, email, telephone };

      const clientSearch = await customerRepository.getByEmail(email);
      if (clientSearch) {
        return res.status(400).json('Cliente já cadastrado!');
      }

      const newCustomer = await customerRepository.create(customer);
      return res.status(201).send(newCustomer);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async list(req, res) {
    try {
      const customers = await customerRepository.list();
      return res.status(200).send(customers);
    } catch (error) {
      return res.status(400).json('Não foi possível listar os clientes!');
    }
  },

  async edit(req, res) {
    try {
      const { name, email, telephone } = req.body;

      const customerSearch = await customerRepository.getById(req.params.id);
      if (!customerSearch) {
        return res.status(400).json('Cliente não cadastrado!');
      }
      await customerRepository.edit({
        name,
        email,
        telephone,
        id: req.params.id,
      });
      return res.status(200).send({ message: 'Cliente alterado com sucesso!' });
    } catch (error) {
      return res.status(400).json('Não foi possível alterar o cliente!');
    }
  },
};
