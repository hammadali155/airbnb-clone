const multer = require('multer');
const path = require('path');


const randomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Directory to save uploaded images
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const nameOnly = path.basename(file.originalname, ext);
    const cleanName = nameOnly.replace(/\s+/g, '-').toLowerCase();
    const uniqueSuffix =cleanName +'-'+randomString(12) + ext;
    cb(null, uniqueSuffix); // Save file with unique name
  }
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Initialize multer with storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

module.exports = upload;  