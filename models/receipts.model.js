const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  shortDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

const receiptSchema = new mongoose.Schema({
  retailer: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  purchaseTime: {
    type: String,
    required: true,
  },
  items: [itemSchema],
  total: {
    type: Number,
    required: true,
  },
})

itemSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

receiptSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

const Receipt = mongoose.model('Receipt', receiptSchema)

module.exports = Receipt
