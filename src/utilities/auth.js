const jwt = require(`jsonwebtoken`);
const config = require("../config/config");
const authentication = (req, res, next) => {
  // console.log(req.headers.authorization)
  // console.log(req.headers.authorization.includes(` `))
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ message: `No Authorization header found or wrong format` });
  }
  const auth = req.headers.authorization;
  try {
    const payload = jwt.verify(auth.split(` `)[1], config.jwtSecret);
    // res.locals.id = payload._id;
    console.log("🚀 ~ file: auth.js:15 ~ authentication ~ payload:", payload);
    res.locals.user = payload;
    if (!auth.startsWith(`Bearer `) || !payload) {
      return res
        .status(401)
        .json({ message: `Authorization credentials (token) not valid` });
    }
    req.userId = payload.userId;
    next();
  } catch (error) {
    //   checking for server errors
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const isAdmin = (req, res, next) => {
  // console.log(req.headers.authorization)
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ msg: `Not Authorized. No Authorization header found` });
  }
  const auth = req.headers.authorization;
  const payload = jwt.verify(auth.split(` `)[1], config.jwtSecret);
  if (!auth.startsWith(`Bearer `) || !payload) {
    return res
      .status(401)
      .json({ message: `Authorization credentials (token) not valid` });
  }
  // res.locals.id = payload._id;
  res.locals.user = payload;
  if (payload.role !== "admin") {
    return res.status(401).json({ msg: `You can not perform this action` });
  }
  next();
};

const checkAccess = async (req, res, next) => {
  const auth = req.headers.authorization;
  const payload = jwt.verify(auth.split(` `)[1], process.env.jwtSecret);

  let allowed = false;
  res.locals.user = payload;
  //getting user to get user roles
  let getUserRole = await UserServices.getUserDetails({ _id: payload.userId });

  //checking each role
  getUserRole?.userRole?.forEach((each) => {
    //checking each route in role
    each.apiPrivilages?.forEach((route) => {
      //checking if user have all authority
      if (route.slice(-1) === "*") {
        let url = route.slice(0, -2);
        if (req.originalUrl.includes(url)) {
          allowed = true;
        }
      }
      //checking for specific authority
      if (req.originalUrl === route) {
        allowed = true;
      }
    });
  });
  //returning if user don't have permission
  if (!allowed) {
    return authorizationErrorResponse(res, messageUtil.unauthorized);
  }
  next();
};

const cookieVerification = (req, res, next) => {
  // const { access_token } = req.cookies;
  // if (!access_token) {
  //   return res.status(401).json({ message: `No Authorization` });
  // }
  // const payload = jwt.verify(access_token.split(` `)[1], process.env.jwtSecret);
  // if (!access_token.startsWith(`Bearer `)) {
  //   return res.status(401).json({ message: `Authorization credentials not valid` });
  // }
  // res.locals.user = payload;
  next();
};

module.exports = { authentication, cookieVerification, isAdmin, checkAccess };
