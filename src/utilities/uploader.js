const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./temp/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
exports.uploads = multer({
  storage: storage,
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
});
const checkFileType = (file, cb) => {
  // Allowed ext
  const filetypes = /csv|CSV/;
  // Check ext
  // const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype) {
    return cb(null, true);
  } else {
    return cb(false, false);
    // return cb('Error: CSV files Only!');
  }
};
