const router = require('express').Router();

const {
  searchUserById,
  updateUser,
} = require('../controllers/users');
const { updateUserInfoValidation } = require('../utils/validation');

router.get('/me', searchUserById);

router.patch('/me', updateUserInfoValidation, updateUser);

module.exports = router;
