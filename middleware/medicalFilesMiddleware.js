const beneficiarys = require(`../schemas/beneficiarySchema`);
// importing all dependencies
const user = require(`../schemas/userSchema`);
const bcrypt = require("bcrypt");
const jwt = require(`jsonwebtoken`);
const mongoose = require("mongoose");


// api for getting a single Beneficiary
const singleMedicalFiles = async (req, res) => {
  try {
    console.log("getting medical files")
    // const document = await beneficiarys.findOne(req.params,).lean();
    const document = await beneficiarys.findOne(req.params,
        { beneficiaryId: 1, account: 1, familyMembers: "$familyMembers", _id: 0 } 
        ).lean()

    // console.log(req.params);
    
    if (!document) {
      return res.status(404).json({ message: `beneficiary not found` });
    }

    // if (res.locals.user.userId !== document.account.userId) {
    //   return res.status(401).json({ message: `Not Authorized` });
    // }
    let medicalFiles = []


    if (document.familyMembers) {
        document.familyMembers.forEach((document) => {
            if( document.medicalFiles){
                let medicalFile = {};
                medicalFile.medicalFileId =  document.medicalFiles.medicalFileId;
                medicalFile.patientId = document.familyMemberId;
                medicalFile.name =  document.firstName + " " + document.lastName;
                medicalFile.birthDate =  document.birthdate.toISOString().split('T')[0];
                medicalFile.weight = document.medicalFiles.weight;
                medicalFile.gender =  document.gender;
                medicalFile.bloodType =  document.medicalFiles.bloodType;
                medicalFile.height =  document.medicalFiles.height;
                medicalFile.relationshipToBeneficiary = document.relationshipToBeneficiary;
                medicalFile.allergies =  document.medicalFiles.allergies;
                medicalFile.chronicDiseases =  document.medicalFiles.chronicDiseases;
                medicalFile.surgeryHistory =  document.medicalFiles.surgeryHistory;
                medicalFile.clinicalVisits =  document.medicalFiles.clinicalVisits;
                medicalFile.medicalTests =  document.medicalFiles.medicalTests;
                medicalFiles.push(medicalFile);
            }
        });

    }   
    const responseBody = {
      codeStatus: "200",
      message: "good",
      data: {
        objectCount: 0,
        hasMore: false,
        objectArray: medicalFiles
      }
    };

    res.status(200).json({... responseBody});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


const singleFamilyMemberMedicalFile = async (req, res) => {
  try {
    console.log("getting medical file for family member")
    console.log(req.params);
    // const document = await beneficiarys.findOne(req.params,).lean();
   
    // const responseBody = {
    //   codeStatus: "200",
    //   message: "good",
    //   data: {
    //     objectCount: 0,
    //     hasMore: false,
    //     objectArray: medicalFiles
    //   }
    // };

    res.status(200).json({... responseBody});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


const singlePatientMedicalFiles = async (req, res) => {
  try {


    
    // const document = await beneficiarys.findOne(req.params,).lean();
    // const document = await beneficiarys.findOne({"familyMembers.familyMemberId": {$eq: req.params.patientId}},
    //     { beneficiaryId: 1, account: 1, familyMembers: "$familyMembers", _id: 0 } 
    //     ).lean()

    const documents = await beneficiarys.aggregate([
      {
        $match: {"familyMembers.familyMemberId": {$eq: req.params.patientId}}
      },
      { $unwind: "$familyMembers" },
      {
        $match: {"familyMembers.familyMemberId": {$eq: req.params.patientId}}
      },
    ]);

    // console.log(req.params);
    // console.log(document)
    
    if (documents.length === 0) {
      return res.status(404).json({ message: `patient not found` });
    }

    // if (res.locals.user.userId !== document.account.userId) {
    //   return res.status(401).json({ message: `Not Authorized` });
    // }
    let medicalFile = {};

    if (documents.length !== 0) {
      document = documents[0].familyMembers
      // console.log(document)
        if( document.medicalFiles){            
            medicalFile.medicalFileId =  document.medicalFiles.medicalFileId;
            medicalFile.patientId = document.familyMemberId;
            medicalFile.name =  document.firstName + " " + document.lastName;
            medicalFile.birthDate =  document.birthdate.toISOString().split('T')[0];
            medicalFile.weight = 120;
            medicalFile.gender =  document.gender;
            medicalFile.bloodType =  document.medicalFiles.bloodType;
            medicalFile.height =  document.medicalFiles.height;
            medicalFile.relationshipToBeneficiary = document.relationshipToBeneficiary;
            medicalFile.allergies =  document.medicalFiles.allergies;
            medicalFile.chronicDiseases =  document.medicalFiles.chronicDiseases;
            medicalFile.surgeryHistory =  document.medicalFiles.surgeryHistory;
            medicalFile.clinicalVisits =  document.medicalFiles.clinicalVisits;
            medicalFile.medicalTests =  document.medicalFiles.medicalTests;
        }
  } 

    

    const responseBody = {
      codeStatus: "200",
      message: "good",
      data: medicalFile
    };

    res.status(200).json({... responseBody});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  singleMedicalFiles,
  singlePatientMedicalFiles,
  singleFamilyMemberMedicalFile
};
