const axios = require('axios');

// Functions to call api's

const login = async () => {
    let data = JSON.stringify({
        "username": "user",
        "password": "123"
    });

    let config = {
        method: 'post',
        url: 'http://localhost:3000/v1/login',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    return axios.request(config)
        .then((response) => {
            let resData = {};
            for (let key in response.data) {
                if (typeof response.data[key] === 'object') {
                    let data = {}

                    for (let k in response.data[key]) {
                        data[k] = typeof response.data[key][k]
                    }

                    resData[key] = data;
                }
                else resData[key] = typeof response.data[key]
            }

            return JSON.stringify(resData);
        })
        .catch((error) => {
            console.log(error);
        });
}

const createUser = async () => {
    let data = JSON.stringify({
        "username": "user111",
        "firstName": "user",
        "secondName": "user",
        "thirdName": "user",
        "lastName": "user",
        "phoneNumber": "123456789",
        "email": "user991@example.com",
        "password": "123",
        "subscriberId": null,
        "doctorId": null,
        "institutionId": null
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/v1/users',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    return axios.request(config)
        .then((response) => {
            console.log("Create User", response.data);
            if (response.status === 200) {
                let resData = {}
                for (let key in response.data) {
                    resData[key] = typeof response.data[key];
                }
                return JSON.stringify(resData)
            }

            else return JSON.stringify(response.data)
        })
        .catch((error) => {
            console.log(error);
        });

}

const logout = async () => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/v1/users/logout',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return axios.request(config)
        .then((response) => {
            console.log("Create User", response.data);
            if (response.status === 200) {
                let resData = {}
                for (let key in response.data) {
                    resData[key] = typeof response.data[key];
                }
                return JSON.stringify(resData)
            }

            else return JSON.stringify(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
}

const getAllUsers = async () => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/v1/users',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    return axios.request(config)
        .then((response) => {
            // console.log("Create User", response.data.data);
            if (response.status === 200) {
                let resData = {}
                for (let key in response.data.data.objectArray) {
                    if(typeof response.data.data.objectArray === 'object'){
                        let data = {}
                        response.data.data.objectArray.map(user =>{
                            for(let k in user){
                                data[k] = typeof user[k]
                            }
                        })
                        resData[key] = data;
                    }
                    else resData[key] = typeof response.data.data.objectArray;
                }
                return JSON.stringify(resData)
            }

            else return JSON.stringify(response.data)
        })
        .catch((error) => {
            console.log(error);
        });

}

const getSpecificUser = async () => {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/v1/users/642d0722d90201503e90b477',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    return axios.request(config)
        .then((response) => {
            console.log("Create User", response.data);
            if (response.status === 200) {
                let resData = {}
                for (let key in response.data) {
                    if(typeof response.data[key] === 'object'){
                        let data = {}
                        response.data[key].map(user =>{
                            for(let k in user){
                                data[k] = typeof user[k]
                            }
                        })
                        resData[key] = data;
                    }
                    else resData[key] = typeof response.data[key];
                }
                return JSON.stringify(resData)
            }

            else return JSON.stringify(response.data)
        })
        .catch((error) => {
            console.log(error);
        });

}


module.exports = {
    login,
    createUser,
    logout,
    getAllUsers,
    getSpecificUser
}
