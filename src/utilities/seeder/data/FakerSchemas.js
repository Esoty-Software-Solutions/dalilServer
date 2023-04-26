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
  }



};


module.exports = fakerSchema;
