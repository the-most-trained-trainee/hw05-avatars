const multer = require('multer');
const path = require('path');


const tempDir = path.join(__dirname, '../', 'tmp');
// const avatarsDir = path.join(__dirname, 'public', 'avatars');
// console.log(avatarsDir);

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 999999999999
  }
});

const upload = multer({
  storage: multerConfig
})

module.exports = upload;