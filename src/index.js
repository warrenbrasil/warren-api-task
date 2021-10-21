const app = require('./app');
const mongoose = require('mongoose');

init();

async function init() {
  try {
    mongoose
      .connect('mongodb://db:27017/node-mongo-docker', {
        useNewUrlParser: true
      })
      .then(result => {
        console.log('MongoDB Conected');
      })
      .catch(error => {
        console.log(error);
      });
    app.listen(9000, () => {
      console.log('Server Listening on Port 9000');
    });
  } catch (error) {
    console.log(error)
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
