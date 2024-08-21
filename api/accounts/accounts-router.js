const accountsModel = require('./accounts-model');

const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require('./accounts-middleware');

const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const accounts = await accountsModel.getAll();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    res.json(req.account);
  } catch (error) {
    next(error)
  }
});

router.post(
  '/',
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const newAccount = await accountsModel.create(req.body);
      res.status(201).json(newAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  checkAccountId,
  checkAccountPayload,
  async (req, res, next) => {
    try {
      const updatedAccount = await accountsModel.updateById(
        req.params.id,
        req.body
      );
      res.json(updatedAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const deletedAcct = await accountsModel.deleteById(req.params.id);
    res.json(deletedAcct)
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
