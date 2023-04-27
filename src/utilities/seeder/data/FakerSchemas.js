const { faker } = require('@faker-js/faker');


const fakerSchema = {
  randomBeneficiary() {
    const beneficiary = {
      _id: faker.database.mongodbObjectId(),
      firstName: faker.name.firstName(),
      secondName: faker.name.firstName(),
      thirdName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      birthdate: faker.date.past(),
      phoneNumber: faker.phone.number(),
      medicalFiles: {
        bloodType: faker.helpers.arrayElement(['A', 'AB', 'O']),
        height: faker.datatype.number(),
        weight: faker.datatype.number(),
      }
    }

    return beneficiary;
  },

  randomSubscriber() {
    const subscriber = {
      _id: faker.database.mongodbObjectId(),
      firstName: faker.name.firstName(),
      secondName: faker.name.firstName(),
      thirdName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      birthdate: faker.date.past(),
      phoneNumber: faker.phone.number(),
      employeeId: faker.random.alphaNumeric(5),
      residentDistrict: faker.address.city()
    }

    return subscriber;
  },

  randomDoctor() {
    const doctor = {
      firstName: faker.name.firstName(),
      secondName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      specialty: "",
      level: "",
      gender: "",
      birthdate: faker.date.past(),
      starRating: faker.random.numeric(),
      commentCount: faker.random.numeric(2),
    }

    return doctor;
  },

  randomMedicalCenter(){
    const medicalCenter = {
      name: faker.name.firstName(),
      city: "",
      district: faker.address.city(),
      description: faker.lorem.sentence(50),
      address: faker.address.city(),
      phoneNumber: faker.phone.number(),
      email: faker.internet.email(),
      facebookLink: faker.internet.url(),
      googleMapLink: faker.internet.url(),
      website: faker.internet.url(),
      thumbnailLink: faker.image.imageUrl(),
      fileLink: faker.datatype.array(),
      isActive: faker.datatype.boolean()
    }

    return medicalCenter;
  }


};


module.exports = fakerSchema;
