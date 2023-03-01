const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/api/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');

require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


// middleware

// const tempDir = path.join(__dirname, 'tmp');
// const avatarsDir = path.join(__dirname, 'public', 'avatars');

// const multerConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, tempDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
//   limits: {
//     fileSize: 999999999999
//   }
// });

// const upload = multer({
//   storage: multerConfig
// })


// app.post('/api/avatars', upload.single("image"), async (req, res) => {
//   const { path: tempUpload, originalname } = req.file;
//   const resultUpload = path.join(avatarsDir, originalname);
//   try {
//     await fs.rename(tempUpload, resultUpload);
//     res.status(201).json(resultUpload);
//   } catch (error) {
//     await fs.unlink(tempUpload);
//   }
// });

// app.get('/api/avatars/:avatarFile', async (req, res) => {
//   const file = req.params.avatarFile;
//   console.log(file);
// })

// ====

app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message, })
});

module.exports = app;
