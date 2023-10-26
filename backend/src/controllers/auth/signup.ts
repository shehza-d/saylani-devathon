import type { RequestHandler } from "express";
import { db } from "../../db/index.mjs";
import { stringToHash } from "bcrypt-inzi";
import { IUser } from "../../types/index.js";
import { isValid } from "../../helpers/index.js";

const collection = "users";
const userCol = db.collection<IUser>(collection);

export const signupHandler: RequestHandler = async (req, res, next) => {
  let { email, name, password } = req?.body;

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // testing left

  if (!isValid(name) || !isValid(email) || !isValid(password)) {
    // validation of length and type is required
    res.status(403).send({
      message: `Required parameters missing!`,
      exampleRequest: {
        name: "shehzad",
        email: "shehzad.dev@pm.me",
        password: "Secret123",
      },
    });
    return;
  }
  if (!emailRegex.test(email)) {
    res.status(403).send({ message: `Please enter a valid Email!` });
    return;
  }

  email = email.toLowerCase();

  try {
    const result = await userCol.findOne({ email });
    console.log("result: ", result);

    if (result) {
      // user already exists
      res.status(403).send({ message: "User already exist with this email." });
      return;
    }
    // user not found

    const passwordHash = await stringToHash(req.body.password);

    const insertResponse = await userCol.insertOne({
      isAdmin: false,
      name,
      email,
      password: passwordHash,
      createdOn: new Date(),
    });
    console.log("insertResponse: ", insertResponse);

    res.send({ message: "Signup successfully!" });
  } catch (err) {
    console.log("error getting data mongodb: ", err);
    res.status(500).send({ message: "Server error, please try again later." });
  }
};
