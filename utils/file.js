const fs = require('fs');
const path = require('path');

exports.deleteImage = (imagePath) => {
    const fullPath = path.join(__dirname, '..', 'public', 'uploads', imagePath);
    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error('Error deleting image:', err);
        } else {
            console.log('Image deleted successfully:', fullPath);
        }
    }); 
}