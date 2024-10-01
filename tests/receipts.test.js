/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const chai = require('chai')
const chaiHttp = require('chai-http')
const sinon = require('sinon')
const { expect } = chai
const app = require('../index')
const Receipt = require('../models/receipts.model')
const calculateReceiptPoints = require('../helpers/calculateReceiptPoints.helper')

chai.use(chaiHttp)

describe('Receipts API', () => {
  afterEach(() => {
    sinon.restore()
  })

  describe('POST /receipts', () => {
    it('should create a new receipt', async () => {
      const newReceipt = {
        retailer: 'Retailer Name',
        purchaseDate: '2024-09-30T00:00:00.000Z',
        purchaseTime: '12:00',
        items: [
          {
            shortDescription: 'Mountain Dew',
            price: '5.25',
          },
          {
            shortDescription: 'Gatorade 23',
            price: '4.00',
          },
        ],
        total: 10,
      }

      const receiptStub = sinon
        .stub(Receipt.prototype, 'save')
        .resolves(newReceipt)

      const res = await chai.request(app).post('/receipts').send(newReceipt)

      expect(res).to.have.status(201)
      expect(res.body).to.include({
        retailer: newReceipt.retailer,
        purchaseDate: newReceipt.purchaseDate,
        purchaseTime: newReceipt.purchaseTime,
        total: newReceipt.total,
      })
      expect(receiptStub.calledOnce).to.be.true
    })

    it('should return validation errors', async () => {
      const res = await chai.request(app).post('/receipts').send({})
      expect(res).to.have.status(400)
      expect(res.body.errors).to.exist
    })
  })

  describe('GET /receipts', () => {
    it('should get all receipts', async () => {
      const receipts = [
        {
          id: '66fb13da8bf5aba5c70e88cc',
          retailer: 'Retailer 1',
          purchaseDate: '2024-09-30',
          purchaseTime: '12:00',
          items: [
            {
              id: '66fb13da8bf5aba5c70e88cd',
              shortDescription: 'Item 1',
              price: '5.25',
            },
          ],
          total: 5.25,
        },
        {
          id: '66fb13da8bf5aba5c70e88ce',
          retailer: 'Retailer 2',
          purchaseDate: '2024-09-30',
          purchaseTime: '12:30',
          items: [
            {
              id: '66fb13da8bf5aba5c70e88cf',
              shortDescription: 'Item 2',
              price: '4.00',
            },
          ],
          total: 4.0,
        },
      ]

      sinon.stub(Receipt, 'find').resolves(receipts)

      const res = await chai.request(app).get('/receipts')

      expect(res).to.have.status(200)
      expect(res.body).to.deep.equal(receipts)
    })
  })

  describe('GET /receipts/:id', () => {
    it('should get a receipt by ID', async () => {
      const receipt = {
        id: '66fb13da8bf5aba5c70e88cc',
        retailer: 'Retailer 1',
        purchaseDate: '2024-09-30',
        purchaseTime: '12:00',
        items: [
          {
            id: '66fb13da8bf5aba5c70e88cd',
            shortDescription: 'Item 1',
            price: '5.25',
          },
        ],
        total: 5.25,
      }

      sinon
        .stub(Receipt, 'findById')
        .withArgs('66fb13da8bf5aba5c70e88cc')
        .resolves(receipt)

      const res = await chai
        .request(app)
        .get('/receipts/66fb13da8bf5aba5c70e88cc')

      expect(res).to.have.status(200)
      expect(res.body).to.deep.equal(receipt)
    })

    it('should return 404 for non-existent receipt', async () => {
      sinon
        .stub(Receipt, 'findById')
        .withArgs('66fb13da8bf5aba5c70e88cc')
        .resolves(null)

      const res = await chai
        .request(app)
        .get('/receipts/66fb13da8bf5aba5c70e88cc')

      expect(res).to.have.status(404)
      expect(res.body.message).to.equal('Receipt not found')
    })
  })

  describe('PUT /receipts/:id', () => {
    it('should update a receipt by ID', async () => {
      const updatedReceipt = {
        id: '66fb13da8bf5aba5c70e88cc',
        retailer: 'Updated Retailer',
        purchaseDate: '2024-09-30',
        purchaseTime: '12:00',
        items: [
          {
            id: '66fb13da8bf5aba5c70e88cd',
            shortDescription: 'Updated Item 1',
            price: '6.00',
          },
        ],
        total: 6.0,
      }

      sinon
        .stub(Receipt, 'findByIdAndUpdate')
        .withArgs('66fb13da8bf5aba5c70e88cc', updatedReceipt, { new: true })
        .resolves(updatedReceipt)

      const res = await chai
        .request(app)
        .put('/receipts/66fb13da8bf5aba5c70e88cc')
        .send(updatedReceipt)

      expect(res).to.have.status(200)
      expect(res.body).to.deep.equal(updatedReceipt)
    })

    it('should return 404 for non-existent receipt', async () => {
      sinon
        .stub(Receipt, 'findByIdAndUpdate')
        .withArgs('66fb13da8bf5aba5c70e88cc', {})
        .resolves(null)

      const res = await chai
        .request(app)
        .put('/receipts/66fb13da8bf5aba5c70e88cc')
        .send({})

      expect(res).to.have.status(404)
      expect(res.body.message).to.equal('Receipt not found')
    })
  })

  describe('DELETE /receipts/:id', () => {
    it('should delete a receipt by ID', async () => {
      const deletedReceipt = {
        id: '66fb13da8bf5aba5c70e88cc',
        retailer: 'Retailer 1',
        purchaseDate: '2024-09-30',
        purchaseTime: '12:00',
        items: [
          {
            id: '66fb13da8bf5aba5c70e88cd',
            shortDescription: 'Item 1',
            price: '5.25',
          },
        ],
        total: 5.25,
      }

      sinon
        .stub(Receipt, 'findByIdAndDelete')
        .withArgs('66fb13da8bf5aba5c70e88cc')
        .resolves(deletedReceipt)

      const res = await chai
        .request(app)
        .delete('/receipts/66fb13da8bf5aba5c70e88cc')

      expect(res).to.have.status(200)
      expect(res.body.message).to.equal('Receipt deleted successfully')
      expect(res.body.deletedReceipt).to.deep.equal(deletedReceipt)
    })

    it('should return 404 for non-existent receipt', async () => {
      sinon
        .stub(Receipt, 'findByIdAndDelete')
        .withArgs('66fb13da8bf5aba5c70e88cc')
        .resolves(null)

      const res = await chai
        .request(app)
        .delete('/receipts/66fb13da8bf5aba5c70e88cc')

      expect(res).to.have.status(404)
      expect(res.body.message).to.equal('Receipt not found')
    })
  })
})
