const { default: mongoose } = require('mongoose');

const uri = process.env.Mongo_URI;

if (!uri) {
  console.error('❌ Mongo_URI is not defined in .env file');
  process.exit(1);
}

module.exports = async function mongoconnect() {
  try {
    console.log('📡 Connecting to MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB successfully!');
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    throw error;
  }
}
