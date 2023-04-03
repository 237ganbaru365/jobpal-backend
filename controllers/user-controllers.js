const DUMMY_USERS = [
  {
    id: "u1",
    name: "Fumina Orozco",
    email: "test@test.com",
    password: "test123",
  },
];

const uuid = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const getAllUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  // this can check requirement you set and return error
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passes, please check your data.", 422);
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((user) => user.email === email);

  if (hasUser) {
    throw new HttpError("Could not create user, email already exists.", 422);
  }

  const createdUser = {
    id: uuid.v4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((user) => user.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Could not authenticated user.", 401);
  }

  res.status(200).json({ message: "Logged in!" });
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
