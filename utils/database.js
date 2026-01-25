const { default: mongoose } = require('mongoose');
const moongoose = require('mongoose');

const USERNAME = 'root'
const PASSWORD = '1928355aB'
const db = 'airbnb'

const host1 = 'ac-jcj8v63-shard-00-00.8v9qlum.mongodb.net'
const host2 = 'ac-jcj8v63-shard-00-01.8v9qlum.mongodb.net'
const host3 = 'ac-jcj8v63-shard-00-02.8v9qlum.mongodb.net'



const uri = `mongodb://${USERNAME}:${PASSWORD}@${host1},${host2},${host3}/${db}?ssl=true&authSource=admin&retryWrites=true`

if (!uri) {
  console.error('❌ MONGODB_URI is not defined in .env file');
  process.exit(1);
}

// , {
//   serverSelectionTimeoutMS: 5000,
//   socketTimeoutMS: 45000,
//   connectTimeoutMS: 3000,
//   family: 4
// }

let _db;

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
