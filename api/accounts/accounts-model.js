const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts');
};

const getById = (id) => {
  return db('accounts').where('id', id).first();
};

const getByName = (name) => {
  return db('accounts').where('name', name).first();
}

const create = async (account) => {
  const [id] = await db('accounts').insert(account);
  return getById(id);
};

const updateById = (id, account) => {
  db('accounts').where('id', id).update(account);
  return getById(id);
};

const deleteById = (id) => {
  const deletedAccount = getById(id);
  db('accounts').where('id', id).del();
  return deletedAccount;
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
};
