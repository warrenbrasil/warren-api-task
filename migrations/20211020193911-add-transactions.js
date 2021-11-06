const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

module.exports = {
  async up(db, client) {
    return db.collection('transactions').insertMany([
      {
        _id: ObjectId('617096779ec7f892fbc32dc3'),
        _customer: ObjectId('616d5a208358e93d5486c2d8'),
        type: 'deposit',
        status: 'accepted',
        amount: 800,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: ObjectId('6170a07bfdd1b515aaf41749'),
        _customer: ObjectId('616d5a208358e93d5486c2d8'),
        type: 'deposit',
        status: 'accepted',
        amount: 1200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: ObjectId('61709a980fca5faf8a828bbb'),
        _customer: ObjectId('616d5a208358e93d5486c2d8'),
        type: 'portfolio_deposit',
        status: 'accepted',
        amount: 460,
        toPortfolio: ObjectId('616dcf9490394d761741c8b0'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: ObjectId('61709c05aa9fb3fa8b1460ca'),
        _customer: ObjectId('616d5a208358e93d5486c2d8'),
        type: 'portfolio_transfer',
        status: 'accepted',
        amount: 110,
        fromPortfolio: ObjectId('616dcf9490394d761741c8b0'),
        toPortfolio: ObjectId('616dd5203f6a6bbcfcf9fed5'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: ObjectId('6170a07bfdd1b515aaf41748'),
        _customer: ObjectId('616d5a208358e93d5486c2d8'),
        type: 'withdraw',
        status: 'accepted',
        amount: 350,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: ObjectId('617099b7aaf28ed4a9c32a0d'),
        _customer: ObjectId('616d5cac34294ebe1f44c76f'),
        type: 'deposit',
        status: 'accepted',
        amount: 2400,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: ObjectId('61709d2def2123d6c849efc2'),
        _customer: ObjectId('616d5cac34294ebe1f44c76f'),
        type: 'portfolio_deposit',
        status: 'accepted',
        amount: 1000,
        toPortfolio: ObjectId('616dd53011be181d85ca3218'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: ObjectId('61709d36e175a566241efeb3'),
        _customer: ObjectId('616d5cac34294ebe1f44c76f'),
        type: 'account_transfer',
        status: 'accepted',
        amount: 200,
        toCustomer: ObjectId('616d5d352621ebc27454c8b3'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: ObjectId('617099f8bded8d0298424ab0'),
        _customer: ObjectId('616d5d352621ebc27454c8b3'),
        type: 'deposit',
        status: 'accepted',
        amount: 340,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: ObjectId('61709d9cb1e2d08bbbcf7d36'),
        _customer: ObjectId('616d5d352621ebc27454c8b3'),
        type: 'portfolio_deposit',
        status: 'accepted',
        amount: 100,
        toPortfolio: ObjectId('6170701d48119c11db14a944'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: ObjectId('61709a2861de99ad71d1a0c5'),
        _customer: ObjectId('616d5d38824eabeced0e4676'),
        type: 'deposit',
        status: 'accepted',
        amount: 3500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: ObjectId('6170a0501471a5ccd1b48712'),
        _customer: ObjectId('616d5d38824eabeced0e4676'),
        type: 'withdraw',
        status: 'accepted',
        amount: 40000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(db, client) {
    db.collection('transactions').deleteMany({
      _id: {
        $in: [
          ObjectId('617096779ec7f892fbc32dc3'),
          ObjectId('61709a980fca5faf8a828bbb'),
          ObjectId('61709c05aa9fb3fa8b1460ca'),
          ObjectId('6170a07bfdd1b515aaf41749'),
          ObjectId('617099b7aaf28ed4a9c32a0d'),
          ObjectId('61709d2def2123d6c849efc2'),
          ObjectId('61709d36e175a566241efeb3'),
          ObjectId('617099f8bded8d0298424ab0'),
          ObjectId('61709d9cb1e2d08bbbcf7d36'),
          ObjectId('61709a2861de99ad71d1a0c5'),
          ObjectId('6170a0501471a5ccd1b48712'),
          ObjectId('6170a07bfdd1b515aaf41748')
        ]
      }
    })
  }
};
