import multer from 'multer';
import path from 'path';
import { __dirname } from '../utils/utils';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadFolder = '';

    if (file.fieldname === 'image') {
      uploadFolder = path.join(__dirname, '../public/pets');
    } else if (file.fieldname === 'document') {
      uploadFolder = path.join(__dirname, '../public/documents');
    }

    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (
    (file.fieldname === 'image' && file.mimetype.startsWith('image/')) ||
    (file.fieldname === 'document' && file.mimetype === 'application/pdf') ||
    (file.fieldname === 'document' && file.mimetype === 'application/msword') ||
    (file.fieldname === 'document' &&
      file.mimetype ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
  ) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no soportado'), false);
  }
};

const dirs = [
  path.join(__dirname, '../public/pets'),
  path.join(__dirname, '../public/documents'),
];

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
