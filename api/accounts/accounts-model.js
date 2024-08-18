const db = require('../../data/db-config');

const getAll = async () => {
  // DO YOUR MAGIC
  const accounts = await db('accounts');
  return accounts;
};

const getById = async (id) => {
  // DO YOUR MAGIC
  const account = await db('accounts').where('id', id);
  return account;
};

const create = async (account) => {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert(account);
  return getById(id);
};

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db('accounts').where('id', id).update(account);
  return getById(id);
};

const deleteById = async (id) => {
  // DO YOUR MAGIC
  const deletedAccount = await getById(id);
  await db('accounts').where('id', id).del();
  return deletedAccount;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
