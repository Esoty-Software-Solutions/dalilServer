var express = require("express");
const { DeleteMedicalFile } = require("../controllers/medicalFilesController");
var router = express.Router();
// router.post("/:beneficiaryId",  createMedicalFile);
// router.get("/",  getMedicalFiles);
// router.patch(
//   "/:id",
//   uploader.singleFileUpload.any({ name: "medicalFile" }),
//   updateMedicalFile
// );

router.delete("/:schema/:fileId", DeleteMedicalFile)
module.exports = router;
