const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3-v2");
const path = require("path");
const config = require("../config/config");
const { aws_accessKeyID, aws_secretAccessKey } = config;

const s3 = new aws.S3({
  accessKeyId: aws_accessKeyID,
  secretAccessKey: aws_secretAccessKey,
  region: "us-east-1",
});

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
function uploadFileS3(fileType, bucketName) {
  if (fileType === "single") {
    return multer({
      storage: multerS3({
        s3: s3,
        bucket: bucketName,
        ACL: "public-read",
        metadata: function (req, file, cb) {
          const headers = {
            "Content-Type": file.mimetype,
            "Cache-Control": "max-age=31536000",
            "Content-Disposition": "inline",
          };
          cb(null, {
            fieldName: file.fieldname,
            ...headers,
          });
        },
        key: function (req, file, cb) {
          const { beneficiaryId } = req.params;
          let medicalFileType =
            req.originalUrl.split("/")[req.originalUrl.split("/").length - 1];
          let filePath = `${beneficiaryId}/${medicalFileType}/${
            Date.now().toString() + "-" + file.originalname
          }`;
          cb(null, filePath);
        },
        contentType: multerS3.AUTO_CONTENT_TYPE,
      }),
      limits: { fileSize: 5242880 }, // In bytes: 5000000 bytes = 5 MB
      fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
      },
    }).single("file");
  } else if (fileType === "multiple") {
    return multer({
      storage: multerS3({
        s3: s3,
        bucket: bucketName,
        ACL: "public-read",
        metadata: function (req, file, cb) {
          const headers = {
            "Content-Type": file.mimetype,
            "Cache-Control": "max-age=31536000",
            "Content-Disposition": "inline",
          };
          cb(null, {
            fieldName: file.fieldname,
            ...headers,
          });
        },
        key: function (req, file, cb) {
          // const {beneficiaryId} = req.params;
          // let medicalFileType = req.originalUrl.split("/")[req.originalUrl.split("/").length - 1];
          // let filePath = `${beneficiaryId}/${medicalFileType}/${Date.now().toString() + '-' + file.originalname}`;
          let filePath = Date.now().toString() + "-" + file.originalname;
          cb(null, filePath);
        },
        contentType: multerS3.AUTO_CONTENT_TYPE,
      }),
      limits: { fileSize: 5242880 }, // In bytes: 5000000 bytes = 5 MB
      fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
      },
    }).array("file" ,4);
  }
}

const getPresignedUrl = async (mainUrl, bucketName) => {
  const params = {
    Bucket: bucketName,
    Key: mainUrl.split(".com/")[1],
    ResponseContentDisposition: "inline", // Set the disposition to inline
    Expires: 20, // Set the URL expiration time to 10 seconds --
    //   time can be changed anywhere afterwards
  };
  try {
    const url = s3.getSignedUrl("getObject", params);
    return url;
  } catch (error) {
    console.log(error);
    return "";
  }
};

const assignedPresignedUrlSingle = async (document) => {
  if (document?.fileLink?.length) {
    const presignedUrlArray = await Promise.all(
      document?.fileLink?.map((link) =>
        getPresignedUrl(link, config.dalilStorage_bucket)
      )
    );
    document.fileLink = presignedUrlArray;
  }
  return document;
};

const allDocumentsPresignedUrl = async (document) => {
  const newDocuments = await Promise.all(
    document.map(async (data) => {
      if (data?.fileLink.length) {
        const presignedUrlArray = await Promise.all(
          data.fileLink.map(
            async (link) =>
              await getPresignedUrl(link, config.dalilStorage_bucket)
          )
        );
        data.fileLink = presignedUrlArray;
      }
      return data;
    })
  );
  return newDocuments;
};

function renameKey(document, newKey, oldKey) {
  // check if the document has the old key
  if (!document.hasOwnProperty(oldKey)) {
    return document; // return the original document if oldKey is not found
  }

  // create a new object to hold the renamed keys
  const newDocument = {};

  // loop through the keys in the original document
  for (const [key, value] of Object.entries(document)) {
    // if the current key matches oldKey, use the new key instead
    if (key === oldKey) {
      newDocument[newKey] = value;
    } else {
      newDocument[key] = value;
    }
  }

  // also rename any key that matches oldKey in subdocuments recursively
  for (const [key, value] of Object.entries(newDocument)) {
    if (typeof value === "object" && value !== null) {
      newDocument[key] = renameKey(value, newKey, oldKey);
    }
  }

  return newDocument;
}

async function returnedSingleDoc(schema, query) {
  const singleDocument = await schema
    .findOne(query)
    .select("-__v -createdAt -updatedAt")
    .lean();
  if (!singleDocument) return;

  const updatedDocument = renameKey(singleDocument, "city", "cityId");
  if (updatedDocument?.fileLink.length) {
    const presignedUrlArray = await Promise.all(
      updatedDocument.fileLink.map(
        async (link) => await getPresignedUrl(link, config.dalilStorage_bucket)
      )
    );
    updatedDocument.fileLink = presignedUrlArray;
  }
  return updatedDocument;
}
module.exports = {
  uploadFileS3,
  getPresignedUrl,
  assignedPresignedUrlSingle,
  allDocumentsPresignedUrl,
  renameKey,
  returnedSingleDoc,
};
