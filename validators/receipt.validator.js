const { body, param } = require('express-validator')

const isMilitaryTime = (value) => {
  const militaryTimeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
  return militaryTimeRegex.test(value)
}

const createValidator = [
  body('retailer').notEmpty().withMessage('Retailer name is required.'),
  body('purchaseDate').isISO8601().withMessage('Invalid purchase date.'),
  body('purchaseTime')
    .custom(isMilitaryTime)
    .withMessage('Purchase time must be in military time format (HH:MM).'),
  body('items').isArray().withMessage('Items must be an array.'),
  body('total').isFloat().withMessage('Total must be a valid number.'),
]

const getReceiptByIdValidator = [
  param('id')
    .notEmpty()
    .withMessage('Receipt ID is required.')
    .isMongoId()
    .withMessage('Invalid UUID format.'),
]

const updateReceiptValidator = [
  param('id')
    .notEmpty()
    .withMessage('Receipt ID is required.')
    .isMongoId()
    .withMessage('Invalid UUID format.'),
  body('retailer')
    .optional()
    .notEmpty()
    .withMessage('Retailer name is required.'),
  body('purchaseDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid purchase date.'),
  body('purchaseTime')
    .optional()
    .custom(isMilitaryTime)
    .withMessage('Purchase time must be in military time format (HH:MM).'),
  body('items').optional().isArray().withMessage('Items must be an array.'),
  body('total')
    .optional()
    .isFloat()
    .withMessage('Total must be a valid number.'),
]

const deleteReceiptValidator = [
  param('id')
    .notEmpty()
    .withMessage('Receipt ID is required.')
    .isMongoId()
    .withMessage('Invalid UUID format.'),
]

module.exports = {
  createValidator,
  getReceiptByIdValidator,
  updateReceiptValidator,
  deleteReceiptValidator,
}
