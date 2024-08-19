const accountsModel = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
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
  const { name } = req.body;
  const allAccounts = await accountsModel.getAll();

  const accountExists = allAccounts.find((account) => {
    account.name === name;
    return account.name;
  });
  if (accountExists) {
    res.status(400).json({ message: 'that name is taken' });
  }
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await accountsModel.getById(req.params.id);
    if (account) {
      req.account = account;
      next();
    } else {
      next({ status: 404, message: 'account not found' });
    }
  } catch (error) {
    next(error);
  }
};
