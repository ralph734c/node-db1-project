const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require('./accounts-model');

const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require('./accounts-middleware');

const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    console.log(`${req.method} all accounts`)
  } catch (error) {
    next(error);
  }
});

router.get('/:id', checkAccountId, (req, res, next) => {
  try {
    console.log(`${req.method} a specific account`)
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    try {
      console.log(`${req.method} an account`)
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    try {
      console.log(`${req.method} an account`)
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', checkAccountId, (req, res, next) => {
  try {
    console.log(`${req.method} an account`)
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
