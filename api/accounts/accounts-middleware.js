const { getById, getAll } = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body;
  if (typeof budget !== 'number') {
    res.status(400).json({ message: 'budget of account must be a number' });
  } else if (!name || !budget) {
    res.status(400).json({ message: 'name and budget are required' });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res
      .status(400)
      .json({ message: 'name of account must be between 3 and 100' });
  } else if (budget < 0 || budget > 1000000) {
    res
      .status(400)
      .json({ message: 'budget of account is too large or too small' });
  } else next();
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const { name } = req.body;
  const allAccounts = await getAll();
  const accountExists = allAccounts.find((account) => {
    account.name === name;
    return account.name;
  });
  if (accountExists) {
    res.status(400).json({ message: 'that name is taken' });
  }
};

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  const checkForId = await getById(id);
  if (checkForId) {
    next();
  } else {
    res.status(404).json({ message: 'account not found' });
  }
};
