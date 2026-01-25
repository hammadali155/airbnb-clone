// Load environment variables first
require('dotenv').config();

// Then run the database initialization
const initializeDatabase = require('./config/initDatabase');

initializeDatabase()
    .then(() => {
        console.log('\n✓ Database setup completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n✗ Database setup failed:', error.message);
        process.exit(1);
    });
