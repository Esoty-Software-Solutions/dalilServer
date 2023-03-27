const response = {
  statusCode: 200,
  message: "good",
  data: [],
};

const medicalFile = {
  "medicalFileId": "LCS-1914-##",
  "bloodType": "A+",
  "height": 182.4,
  "weight": 60,
  "allergies": [
    {
      "allergyName": "Asthma",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet augue arcu, sagittis consectetur urna pharetra et. Praesent imperdiet egestas risus, nec rhoncus eros consectetur eget. Mauris maximus, purus vel maximus pharetra, dui massa tincidunt eros, sit amet efficitur nulla mi nec libero. Proin facilisis eu quam vel pharetra. Sed in ipsum semper, malesuada massa in, euismod orci. Aliquam erat volutpat. Nunc vitae quam lobortis, malesuada augue et, int"
    },
    {
      "allergyName": "Atopic Eczema",
      "notes": "Lorem ipsum dolor sit amet,u, sagittis cmperdi"
    },
    {
      "allergyName": "Drug Allergy",
      "notes": "Lorem ipu, sagittis consimus ibero. Proin facilisis eu quam vel pharetra. Sed in ipsum semper, malesuada massa in, euismod orci. Aliquam erat volutpat. Nunc vitae quam lobortis, malesuada augue et, int"
    }
  ],
  "chronicDiseases": [
    {
      "DiseaseName": "heart disease",
      "diagnosisDate": "1940-10-24",
      "diagnosedBy": "Ahmed Salman",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet augue arcu, sagittis consectetur urna pharetra et. Praesent imperdiet egestas risus, nec rhoncus eros consectetur eget. Mauris maximus, purus vel maximus pharetra, dui massa tincidunt eros, sit amet efficitur nulla mi nec libero. Proin facilisis eu quam vel pharetra. Sed in ipsum semper, malesuada massa in, euismod orci. Aliquam erat volutpat. Nunc vitae quam lobortis, malesuada augue et, int"
    },
    {
      "DiseaseName": "heart disease",
      "diagnosisDate": "1940-10-24",
      "diagnosedBy": "Ahmed Salman",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet augue arcu, sagittis consectetur urna pharetra et. Praesent imperdiet egestas risus, nec rhoncus eros consectetur eget. Mauris maximus, purus vel maximus pharetra, dui massa tincidunt eros, sit amet efficitur nulla mi nec libero. Proin facilisis eu quam vel pharetra. Sed in ipsum semper, malesuada massa in, euismod orci. Aliquam erat volutpat. Nunc vitae quam lobortis, malesuada augue et, int"
    },
    {
      "DiseaseName": "depression",
      "diagnosisDate": "1940-10-24",
      "diagnosedBy": "Ahmed Salman",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet augue arcu, sagittis consectetur urna pharetra et. Praesent imperdiet egestas risus, nec rhoncus eros consectetur eget. Mauris maximus, purus vel maximus pharetra, dui massa tincidunt eros, sit amet efficitur nulla mi nec libero. Proin facilisis eu quam vel pharetra. Sed in ipsum semper, malesuada massa in, euismod orci. Aliquam erat volutpat. Nunc vitae quam lobortis, malesuada augue et, int"
    },
    {
      "DiseaseName": "arthritis",
      "diagnosisDate": "1940-10-24",
      "diagnosedBy": "Ahmed Salman",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet augue arcu, sagittis consectetur urna pharetra et. Praesent imperdiet egestas risus, nec rhoncus eros consectetur eget. Mauris maximus, purus vel maximus pharetra, dui massa tincidunt eros, sit amet efficitur nulla mi nec libero. Proin facilisis eu quam vel pharetra. Sed in ipsum semper, malesuada massa in, euismod orci. Aliquam erat volutpat. Nunc vitae quam lobortis, malesuada augue et, int"
    },
    {
      "DiseaseName": "osteoporosis",
      "diagnosisDate": "1940-10-24",
      "diagnosedBy": "Ahmed Salman",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet augue arcu, sagittis consectetur urna pharetra et. Praesent imperdiet egestas risus, nec rhoncus eros consectetur eget. Mauris maximus, purus vel maximus pharetra, dui massa tincidunt eros, sit amet efficitur nulla mi nec libero. Proin facilisis eu quam vel pharetra. Sed in ipsum semper, malesuada massa in, euismod orci. Aliquam erat volutpat. Nunc vitae quam lobortis, malesuada augue et, int"
    }
  ],
  "surgeryHistory": [
    {
      "SurgeryName": "Cesarean section",
      "SurgeryDate": "1940-10-24",
      "doctorName": "Salma Fatima Mohammed",
      "medicalCenterName": "Shafa Hospital",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet augue arcu, sagittis consectetur urna pharetra et. Praesent imperdiet egestas risus, nec rhoncus eros consectetur eget. Mauris maximus, purus vel maximus pharetra, dui massa tincidunt eros, sit amet efficitur nulla mi nec libero. Proin facilisis eu quam vel pharetra. Sed in ipsum semper, malesuada massa in, euismod orci. Aliquam erat volutpat. Nunc vitae quam lobortis, malesuada augue et, int"
    },
    {
      "SurgeryName": "Inguinal hernia repair",
      "SurgeryDate": "1940-10-24",
      "doctorName": "Salma Fatima Mohammed",
      "medicalCenterName": "Shafa Hospital",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet augue arcu, sagittis consectetur urna pharetra et. Praesent imperdiet egestas risus, nec rhoncus eros consectetur eget. Mauris maximus, purus vel maximus pharetra, dui massa tincidunt eros, sit amet efficitur nulla mi nec libero. Proin facilisis eu quam vel pharetra. Sed in ipsum semper, malesuada massa in, euismod orci. Aliquam erat volutpat. Nunc vitae quam lobortis, malesuada augue et, int"
    },
    {
      "SurgeryName": "Appendectomy",
      "SurgeryDate": "1940-10-24",
      "doctorName": "Salma Fatima Mohammed",
      "medicalCenterName": "Shafa Hospital",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet augue arcu, sagittis consectetur urna pharetra et. Praesent imperdiet egestas risus, nec rhoncus eros consectetur eget. Mauris maximus, purus vel maximus pharetra, dui massa tincidunt eros, sit amet efficitur nulla mi nec libero. Proin facilisis eu quam vel pharetra. Sed in ipsum semper, malesuada massa in, euismod orci. Aliquam erat volutpat. Nunc vitae quam lobortis, malesuada augue et, int"
    },
    {
      "SurgeryName": "Surgery 4",
      "SurgeryDate": "2010-10-24",
      "doctorName": "Salma Fatima Mohammed",
      "medicalCenterName": "Shafa Hospital",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet augue arcu, sagittis consectetur urna pharetra et. Praesent imperdiet egestas risus, nec rhoncus eros consectetur eget. Mauris maximus, purus vel maximus pharetra, dui massa tincidunt eros, sit amet efficitur nulla mi nec libero. Proin facilisis eu quam vel pharetra. Sed in ipsum semper, malesuada massa in, euismod orci. Aliquam erat volutpat. Nunc vitae quam lobortis, malesuada augue et, int"
    },
    {
      "SurgeryName": "Surgery 5",
      "SurgeryDate": "1920-10-24",
      "doctorName": "Salma Fatima Mohammed",
      "medicalCenterName": "Shafa Hospital",
      "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet augue arcu, sagittis consectetur urna pharetra et. Praesent imperdiet egestas risus, nec rhoncus eros consectetur eget. Mauris maximus, purus vel maximus pharetra, dui massa tincidunt eros, sit amet efficitur nulla mi nec libero. Proin facilisis eu quam vel pharetra. Sed in ipsum semper, malesuada massa in, euismod orci. Aliquam erat volutpat. Nunc vitae quam lobortis, malesuada augue et, int"
    },
    {
      "SurgeryName": "Surgery 6",
      "SurgeryDate": "1940-10-24",
      "doctorName": "Salma Fatima Mohammed",
      "medicalCenterName": "Hekma Hospital",
      "notes": "Lorem ipsum dolor sit amet"
    }
  ],
  "clinicalVisits": [
    {
      "visitType": "Dental",
      "visitDate": "1940-10-24",
      "doctorName": "Salma Fatima Mohammed",
      "centerName": "Shafa Hospital",
      "notes": "Lorem ipsuet augue arcu, sagittis consectethoncus eros consectetur eget. Mauris maximus, purus vel maximus pharetra, dui massa tincidunt eros, sit amet efficitur nulla mi nec libero. Proin facilisis eu quam vel pharetra. Sed in ipsum semper, malesuada massa in, euismod orci. Aliquam erat volutpat. Nunc vitae quam lobortis, malesuada augue et, int"
    },
    {
      "visitType": "Dental111",
      "visitDate": "1940-10-14",
      "doctorName": "Salma Fatima Mohammed",
      "centerName": "Shafa Hospital",
      "notes": "Lorem ipsuet augue arcu, sagittis consectethoncus eros consectetur eget. Mauris maximus, purus vel maximus pharetra, dui massa tincidunt eros, sit amet efficitur nulla mi nec libero. Proin facilisis eu quam vel pharetra. Sed in ipsum semper, malesuada massa in, euismod orci. Aliquam erat volutpat. Nunc vitae quam lobortis, malesuada augue et, int"
    },
    {
      "visitType": "Family Doctor",
      "visitDate": "1940-11-24",
      "doctorName": "Salma Fatima Mohammed",
      "centerName": "Shafa Hospital",
      "notes": "Lorem ipsuet augue arcu, sagittis consectethoncus eros consectetur eget. Mauris maximus, purus vel maximus pharetra, dui massa tincidunt eros, sit amet efficitur nulla mi nec libero. Proin facilisis eu quam vel pharetra. Sed in ipsum semper, malesuada massa in, euismod orci. Aliquam erat volutpat. Nunc vitae quam lobortis, malesuada augue et, int"
    },
    {
      "visitType": "Optometry",
      "visitDate": "2020-11-01",
      "doctorName": "Salma Fatima Mohammed",
      "centerName": "Hekma Hospital",
      "notes": "Lorem ipsuet augue arcu, sagittis consectethoncus eros consectetur eget. Mauris maximus, purus vel maximus pharetra, dui massa tincidunt eros, sit amet efficitur nulla mi nec libero. Proin facilisis eu quam vel pharetra. Sed in ipsum semper, malesuada massa in, euismod orci. Aliquam erat volutpat. Nunc vitae quam lobortis, malesuada augue et, int"
    },
    {
      "visitType": "Pediatrics ",
      "visitDate": "2010-10-24",
      "doctorName": "Salma Fatima Mohammed",
      "centerName": "Safwa Clinic",
      "notes": "Lorem ipsuet augue arcu, sagiint sfsdaf"
    }
  ],
  "medicalTests": [
    {
      "labReportId": "LCS-1914-##",
      "labReportCategory": "CBS",
      "centerName": "misurata central lab",
      "reportDate": "2019-06-24",
      "district": "Janzour",
      "city": "Misurata",
      "testInformation": [
        {
          "testName": "testName",
          "acronym": "TN",
          "resultType": "quantitative",
          "result": {
            "value": 18,
            "upperRange": 15,
            "lowerRange": 10,
            "level": "high",
            "unit": "ml/s"
          }
        },
        {
          "testName": "testName",
          "acronym": "TN",
          "resultType": "quantitative",
          "result": {
            "value": 8,
            "upperRange": 15,
            "lowerRange": 10,
            "level": "low",
            "unit": "ml/s"
          }
        },
        {
          "testName": "testName",
          "acronym": "TN",
          "resultType": "quantitative",
          "result": {
            "value": 12,
            "upperRange": 15,
            "lowerRange": 10,
            "level": "normal",
            "unit": "mg/s"
          }
        },
        {
          "testName": "testName",
          "acronym": "TN",
          "resultType": "quantitative",
          "result": {
            "value": 12,
            "upperRange": 15,
            "lowerRange": 10,
            "level": "normal",
            "unit": "mg/s"
          }
        },
        {
          "testName": "testName",
          "acronym": "TN",
          "resultType": "qualitative",
          "result": {
            "value": "positive",
            "reference": "negative",
            "level": "critical",
            "unit": "sign"
          }
        },
        {
          "testName": "testName",
          "acronym": "TN",
          "resultType": "qualitative",
          "result": {
            "value": "positive",
            "reference": "negative",
            "level": "abnormal",
            "unit": ""
          }
        },
        {
          "testName": "testName",
          "acronym": "TN",
          "resultType": "qualitative",
          "result": {
            "value": "yellow",
            "reference": "white",
            "level": "abnormal",
            "unit": "color"
          }
        },
        {
          "testName": "testName",
          "acronym": "TN",
          "resultType": "qualitative",
          "result": {
            "value": "20-39",
            "reference": "NONE SEEN",
            "level": "abnormal",
            "unit": "hpf"
          }
        }
      ]
    },
    {
      "labReportId": "LCS-1914-23",
      "labReportCategory": "CVSS",
      "centerName": "Tarik Laboratory",
      "reportDate": "2019-07-24",
      "district": "Rewasat",
      "city": "Misurata",
      "testInformation": [
        {
          "testName": "testName222",
          "acronym": "TN",
          "resultType": "quantitative",
          "result": {
            "value": 13,
            "upperRange": 15,
            "lowerRange": 10,
            "level": "normal",
            "unit": "ml/s"
          }
        },
        {
          "testName": "sample test",
          "acronym": "TN",
          "resultType": "quantitative",
          "result": {
            "value": 20,
            "upperRange": 20,
            "lowerRange": 15,
            "level": "normal",
            "unit": "ml/s"
          }
        },
        {
          "testName": "testName",
          "acronym": "TN",
          "resultType": "quantitative",
          "result": {
            "value": 12,
            "upperRange": 15,
            "lowerRange": 10,
            "level": "normal",
            "unit": "mg/s"
          }
        },
        {
          "testName": "testName",
          "acronym": "TN",
          "resultType": "quantitative",
          "result": {
            "value": 12,
            "upperRange": 15,
            "lowerRange": 10,
            "level": "normal",
            "unit": "mg/s"
          }
        },
        {
          "testName": "testName",
          "acronym": "TN",
          "resultType": "qualitative",
          "result": {
            "value": "positive",
            "reference": "negative",
            "level": "critical",
            "unit": "sign"
          }
        },
        {
          "testName": "testName",
          "acronym": "TN",
          "resultType": "qualitative",
          "result": {
            "value": "positive",
            "reference": "negative",
            "level": "abnormal",
            "unit": ""
          }
        },
        {
          "testName": "testName",
          "acronym": "TN",
          "resultType": "qualitative",
          "result": {
            "value": "yellow",
            "reference": "white",
            "level": "abnormal",
            "unit": "color"
          }
        },
        {
          "testName": "testName",
          "acronym": "TN",
          "resultType": "qualitative",
          "result": {
            "value": "20-39",
            "reference": "NONE SEEN",
            "level": "abnormal",
            "unit": "hpf"
          }
        }
      ]
    }
  ]
}

const mongoose = require("mongoose");
const sms = require(`../schemas/smsSchema`);

const getMedicalFiles = async (req, res) => {
  try {
    response.data = medicalFile;
    res.status(200).json({...response});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const createAllergy = async (req, res) => {
  try {
    let fieldnames = []
    let originalnames = []

    console.log("Submit Claim response ---------------------------------------------------")
    req.files.forEach(file => {
      fieldnames.push(file.fieldname)
      originalnames.push(file.originalname)
    })
    const responseBody = {
      codeStatus: "201",
      message: "good",
      data: {
        requestBody: req.body,
        fileFieldName: fieldnames,
        originalname: originalnames
      },
    };

    res.status(201).json({ ...responseBody });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


const getAllergies = async (req, res) => {
  try {
    const objectArray = await sms
      .find({
        messageStatus: { $eq: "pending" },
      })
      .lean();
    const objectCount = objectArray.length
    document = {
      objectCount,
      objectArray
    }
    response.data = document;
    res.status(200).json({...response});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getSMSs = async (req, res) => {
  try {
    const objectArray = await sms
      .find({
        messageStatus: { $eq: "pending" },
      })
      .lean();
    const objectCount = objectArray.length
    document = {
      objectCount,
      objectArray
    }
    response.data = document;
    res.status(200).json({...response});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { createAllergy, getMedicalFiles };