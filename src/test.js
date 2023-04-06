const testing = require('@jest/globals')
const describe = testing.describe;
const test = testing.test;
const expect = testing.expect;

// Expected Response
const expected = require('./testingData/expectedResponse.json');

// Functions for Received response
const {login, createUser, logout, getAllUsers, getSpecificUser} = require('./testingData/testAPIs');



describe('Unit Tests', () => {

    test('Login', async () => {
        expect(await login()).toBe(JSON.stringify(expected.login));
    });

    // test('Create User', async () => {
    //     expect(await createUser()).toBe(JSON.stringify(expected.createUser));
    // });

    test('Logout', async () => {
        expect(await logout()).toBe(JSON.stringify(expected.logout));
    });

    test('Get All Users', async () => {
        expect(await getAllUsers()).toBe(JSON.stringify(expected.getUsers));
    });

    // test('Get Specific User', async () => {
    //     expect(await getSpecificUser()).toBe(JSON.stringify(expected.getSpecificUser));
    // });
})