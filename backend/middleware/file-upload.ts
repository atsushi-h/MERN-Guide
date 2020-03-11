import multer from 'multer';
import uuid from 'uuid';

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const fileUpload = multer({
  limits: {
    fileSize: 500000
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, uuid() + '.' + ext);
      }
    }
  }),
  fileFilter: (req, file, cb) => {
    let error: Error | null;
    let isValid;

    // バリデーション
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      isValid = true;
      error = null;
      cb(error, isValid);
    } else {
      // isValid = false;
      error = new Error('Invalid mime type!');
      cb(error);
    }
  }
});

export default fileUpload;
