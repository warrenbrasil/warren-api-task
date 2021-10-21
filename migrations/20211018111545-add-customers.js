const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

module.exports = {
  async up(db, client) {
    return db.collection('customers').insertMany([
      {
        _id: ObjectId('616d5a208358e93d5486c2d8'),
        firstName: 'Harry', lastName: 'Potter', balance: 500,
        portfolios: [
          {
            _id: ObjectId('616dcf9490394d761741c8b0'),
            name: 'NIMBUS 2000',
            amount: 350,
            goalAmount: 1200,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            _id: ObjectId('616dd5203f6a6bbcfcf9fed5'),
            name: 'Pack de meias para Dobby',
            amount: 110,
            goalAmount: 100,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        _id: ObjectId('616d5cac34294ebe1f44c76f'),
        firstName: 'Hermione', lastName: 'Granger', balance: 1200,
        portfolios: [
          {
            _id: ObjectId('616dd53011be181d85ca3218'),
            name: 'Fundo de Apoio aos Elfos-Domésticos',
            amount: 5600,
            goalAmount: 18000,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        _id: ObjectId('616d5d352621ebc27454c8b3'),
        firstName: 'Ronald', lastName: 'Weasley', balance: 235,
        portfolios: [
          {
            _id: ObjectId('616eb670b86ea265af52d98d'),
            name: 'doces do Expresso de Hogwarts',
            amount: 55,
            goalAmount: 80,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            _id: ObjectId('61706f6b3bb786252c1b7237'),
            name: 'carro voador novo',
            amount: 12,
            goalAmount: 45000,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            _id: ObjectId('6170701d48119c11db14a944'),
            name: 'viver de renda',
            amount: 265,
            goalAmount: 300000,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        _id: ObjectId('616d5d38824eabeced0e4676'),
        firstName: 'Albus', lastName: 'Dumbledore', balance: 2500,
        portfolios: [
          {
            _id: ObjectId('6170700be3c765f518e859fe'),
            name: 'Aposentadoria',
            amount: 765800,
            goalAmount: 800000,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        createdAt: new Date(), updatedAt: new Date()
      }
    ])
  },

  async down(db, client) {
    db.collection('customers').deleteMany({
      _id: {
        $in: [
          ObjectId('616d5a208358e93d5486c2d8'),
          ObjectId('616d5cac34294ebe1f44c76f'),
          ObjectId('616d5d352621ebc27454c8b3'),
          ObjectId('616d5d38824eabeced0e4676')
        ]
      }
    })
  }
};
