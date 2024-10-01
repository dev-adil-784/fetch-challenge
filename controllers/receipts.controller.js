const { validationResult } = require('express-validator')
const calculateReceiptPoints = require('../helpers/calculateReceiptPoints.helper')
const Receipt = require('../models/receipts.model')

const createReceipt = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { retailer, purchaseDate, purchaseTime, items, total } = req.body

  try {
    const newReceipt = new Receipt({
      retailer,
      purchaseDate,
      purchaseTime,
      items,
      total,
    })
    await newReceipt.save()
    res.status(201).json(newReceipt)
  } catch (error) {
    res.status(500).json({ message: 'Error creating receipt', error })
  }
}

const getAllReceipts = async (_, res) => {
  const purchases = await Receipt.find()
  res.status(200).json(purchases)
}

const getReceiptById = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { id } = req.params

  try {
    const receipt = await Receipt.findById(id)
    if (!receipt) {
      return res.status(404).json({ message: 'Receipt not found' })
    }
    res.json(receipt)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching receipt', error })
  }
}

const getReceiptPointsById = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { id } = req.params

  try {
    const receipt = await Receipt.findById(id)
    const points = calculateReceiptPoints(receipt.toJSON())
    if (!receipt) {
      return res.status(404).json({ message: 'Receipt not found' })
    }
    res.json({ points: points })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching receipt', error })
  }
}

const updateReceiptById = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { id } = req.params
  const updateData = req.body

  try {
    const updatedReceipt = await Receipt.findByIdAndUpdate(id, updateData, {
      new: true,
    })
    if (!updatedReceipt) {
      return res.status(404).json({ message: 'Receipt not found' })
    }
    res.json(updatedReceipt)
  } catch (error) {
    res.status(500).json({ message: 'Error updating receipt', error })
  }
}

const deleteReceiptById = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { id } = req.params

  try {
    const deletedReceipt = await Receipt.findByIdAndDelete(id)
    if (!deletedReceipt) {
      return res.status(404).json({ message: 'Receipt not found' })
    }
    res.status(200).json({
      message: 'Receipt deleted successfully',
      deletedReceipt,
    })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting receipt', error })
  }
}

module.exports = {
  createReceipt,
  getAllReceipts,
  getReceiptById,
  updateReceiptById,
  deleteReceiptById,
  getReceiptPointsById,
}
