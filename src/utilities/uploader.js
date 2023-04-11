const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3-v2");
const path = require("path");
const config = require("../config/config");
const { aws_bucketName , aws_accessKeyID, aws_secretAccessKey} = config
console.log("aws_bucketName");
console.log(aws_bucketName);
console.log("config.aws_bucketName");
console.log(config.aws_bucketName);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./temp/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const uploads = multer({
//   storage: storage,
//   fileFilter: function (_req, file, cb) {
//     checkFileType(file, cb);
//   },
// });
// const checkFileType = (file, cb) => {
//   // Allowed ext
//   const filetypes = /csv|CSV/;
//   // Check ext
//   // const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype);
//   if (mimetype) {
//     return cb(null, true);
//   } else {
//     return cb(false, false);
//     // return cb('Error: CSV files Only!');
//   }
// };

const s3 = new aws.S3({
  accessKeyId: aws_accessKeyID,
  secretAccessKey: aws_secretAccessKey,  
  region: 'us-east-1'
});

// const singleFileUpload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.aws_bucketName,
//     acl: "public-read",
//     contentType: multerS3.AUTO_CONTENT_TYPE, // very important

//     key: function (req, file, cb) {
//       let folder = req.originalUrl.split("/v1/")[1];
//       let fullPath =
//         path.basename(file.originalname, path.extname(file.originalname)) +
//         "-" +
//         Date.now() +
//         path.extname(file.originalname);
//       cb(null, `${folder}/` + fullPath);
//     },
//   }),
//   limits: { fileSize: 5242880 }, // In bytes: 5000000 bytes = 5 MB
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|csv|CSV|pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}
/*
creating fileName
beneficiaryId/
*/
const uploadFileS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: aws_bucketName,
    ACL: 'public-read',
    metadata: function (req, file, cb) {
      const headers = {
        'Content-Type': file.mimetype,
        'Cache-Control': 'max-age=31536000',
        'Content-Disposition': 'inline',
      };
      cb(null, {
         fieldName: file.fieldname,
         ...headers 
        });
      
    },
    key: function (req, file, cb) {
      const {beneficiaryId} = req.params;
      let medicalFileType = req.originalUrl.split("/")[req.originalUrl.split("/").length - 1];
      let filePath = `${beneficiaryId}/${medicalFileType}/${Date.now().toString() + '-' + file.originalname}`;
      cb(null, filePath);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE
  }),
  limits: { fileSize: 5242880 }, // In bytes: 5000000 bytes = 5 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

const getPresignedUrl = async (mainUrl) => {
  const params = {
    Bucket: process.env.aws_bucketName,
    Key: mainUrl.split(".com/")[1],
    ResponseContentDisposition: 'inline', // Set the disposition to inline
    Expires: 20 // Set the URL expiration time to 10 seconds -- 
  //   time can be changed anywhere afterwards
  };
  try {
    const url = s3.getSignedUrl('getObject', params);
    console.log(url);
    return url;  
  } catch (error) {
    console.log(error);
    return "";    
  }
  
}

module.exports = {
  uploadFileS3,
  getPresignedUrl
};
