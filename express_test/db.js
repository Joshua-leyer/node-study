const mongoose = require('mongoose')

async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/test');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
    }
}
  
connectToDatabase();
module.exports = {
    mongoose
}







