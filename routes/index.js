const ReceiptController = require('../controllers/receipts.controller')
const ReceiptValidator = require('../validators/receipt.validator')

const router = require('express').Router()

router.get('/', (req, res) => res.status(200).send('hello'))

router.get('/receipts', ReceiptController.getAllReceipts)
router.get(
  '/receipts/:id',
  ReceiptValidator.getReceiptByIdValidator,
  ReceiptController.getReceiptById,
)
router.get(
  '/receipts/:id/points',
  ReceiptValidator.getReceiptByIdValidator,
  ReceiptController.getReceiptPointsById,
)
router.post(
  '/receipts',
  ReceiptValidator.createValidator,
  ReceiptController.createReceipt,
)
router.put(
  '/receipts/:id',
  ReceiptValidator.updateReceiptValidator,
  ReceiptController.updateReceiptById,
)
router.delete(
  '/receipts/:id',
  ReceiptValidator.deleteReceiptValidator,
  ReceiptController.deleteReceiptById,
)

router.get('/', (req, res) => res.status(200).send('Hello world'))

module.exports = router
