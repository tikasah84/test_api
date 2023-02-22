const errorFunction = require("../../utils/errorFunction");
const User = require("../models/user");
const { securePassword, checkPassword } = require("../../utils/securePassword");
const Logger = require("../../../logger");
var jwt = require("jsonwebtoken");
const addUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email,
    }).lean(true);
    if (existingUser) {
      Logger.error("User Already Exists with this email");
      res.status(403);
      return res.json(
        errorFunction(true, "User Already Exists with this email")
      );
    } else {
      const hashedPassword = await securePassword(req.body.password);
      const newUser = await User.create({
        email: req.body.email,
        password: hashedPassword,
        fullName: req.body.fullName,
        dateOfBirthInBS: req.body.dateOfBirthInBS,
        dateOfBirthInAD: req.body.dateOfBirthInAD,
        phone: req.body.phone,
        institute: req.body.institute,
        faculty: req.body.faculty,
      });
      if (newUser) {
        const userData = {
          email: newUser.email,
        };
        Logger.info("User Created");
        res.status(201);
        return res.json(errorFunction(false, "User Created", userData));
      } else {
        res.status(403);
        return res.json(errorFunction(true, "Error Creating User"));
      }
    }
  } catch (error) {
    Logger.error("Error Adding user");
    res.status(400);
    return res.json(errorFunction(true, "Error Adding user"));
  }
};

//Login user

const login = async (req, res, next) => {
  try {
    var data = await User.find({ email: req.body.email }).exec();
    if (data.length < 1) {
      Logger.error("User Not Found");
      res.status(404);
      return res.json(errorFunction(true, "User Not Found"));
    } else {
      existingUser = data[0];
    }

    if (existingUser) {
      const isPasswordMatch = await checkPassword(
        req.body.password,
        existingUser.password
      );
      if (isPasswordMatch) {
        var userData = {
          id: existingUser._id,
          email: existingUser.email,
        };
      } else {
        Logger.error("Invalid Password");
        res.status(403);
        return res.json(errorFunction(true, "Invalid Password"));
      }
      jwt.sign(
        {
          // exp: Math.floor(Date.now() / 1000) + 60, //60 seconds
          data: userData,
        },
        process.env.SECRET_KEY,
        (err, token) => {
          if (err) {
            Logger.error("Error Signing Token");
            res.status(403);
            return res.json(errorFunction(true, "Error Signing Token"));
          } else {
            Logger.info("Login user");
            res.status(201);
            return res.json(
              errorFunction(false, "Login Successful", { token: token })
            );
          }
        }
      );
    }
  } catch (error) {
    Logger.error("Error Logging In");
    res.status(400);
    return res.json(errorFunction(true, "Error Logging In"));
  }
};

//get profile information

const profile = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(403);
      return res.json(errorFunction(true, err));
    } else {
      const userData = {
        id: decoded.data.id,
        email: decoded.data.email,
      };
      res.status(201);
      return res.json(errorFunction(false, "Profile", userData));
    }
  });
};

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(403);
    return res.json(errorFunction(true, "No Authorization"));
  } else {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(403);
        return res.json(errorFunction(true, "Invalid token access denied"));
      } else {
        next();
      }
    });
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 }).exec();
    if (users) {
      Logger.info("Users");
      res.status(201);
      return res.json(errorFunction(false, "Users", users));
    } else {
      Logger.error("Error Getting Users");
      res.status(403);
      return res.json(errorFunction(true, "Error Getting Users"));
    }
  } catch (error) {
    Logger.error("Error Getting Users");
    res.status(400);
    return res.json(errorFunction(true, "Error Getting Users"));
  }
};

const deleteUser = async (req, res) => {
  //Delete particular user with id
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      Logger.info("User Deleted");
      res.status(201);
      return res.json(errorFunction(false, "User Deleted"));
    }
  } catch (error) {
    Logger.error("Error Deleting User");
    res.status(400);
    return res.json(errorFunction(true, "Error Deleting User"));
  }
};

// const forgetPassword = async function (req, res) {
//   try {

//   } catch (err) {}
// };

module.exports = {
  addUser,
  login,
  profile,
  auth,
  getUsers,
  deleteUser,
};
