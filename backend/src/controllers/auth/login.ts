import type { RequestHandler } from "express";
import { db } from "../../db/index.mjs";
import jwt from "jsonwebtoken";
import { verifyHash } from "bcrypt-inzi";
import { IUser } from "../../types/index.js";
import { SECRET } from "../../config/index.js";

const collection = "users";
const userCol = db.collection<IUser>(collection);

export const loginHandler: RequestHandler = async (req, res, next) => {
  let { email } = req?.body;
  const { password } = req?.body;

  if (!email || !password) {
    res.status(403).send({ message: `Required parameters missing!` });
    return;
  }

  email = email.toLowerCase();

  try {
    const result = await userCol.findOne({ email });

    if (!result) {
      // user not found
      res.status(401).send({ message: "Incorrect email or password!" });
      return;
    }

    // user found

    const isMatch = await verifyHash(password, result.password);

    if (!isMatch) {
      res.status(401).send({ message: "Incorrect email or password!" });
      return;
    }

    const token = jwt.sign(
      {
        isDoctor: result.isDoctor,
        name: result.name,
        email,
        _id: result._id,
      },
      SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("myToken", token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 86400000),
    });

    res.status(200).send({ message: "LoggedIn successfully" });
  } catch (err) {
    console.log("error getting data mongodb: ", err);
    res.status(500).send({ message: "Server error, please try again later." });
  }
};
