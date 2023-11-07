import type { RequestHandler } from "express";
import { IUser } from "../types/index.js";
import { db } from "../db/index.mjs";
import { ObjectId } from "mongodb";

const collection = "users";
const userCol = db.collection<IUser>(collection);

const getUserProfile: RequestHandler = async (req, res) => {
  const userId = req?.params?.id || req.body?.decodedData?._id;

  if (!ObjectId.isValid(userId)) {
    res.status(403).send({ message: `Invalid user id` });
    return;
  }

  try {
    const user = await userCol.findOne({ _id: new ObjectId(userId) });

    // @ts-ignore
    delete user?.password; // password hash should not be sent to client

    res.status(200).send({
      message: "User profile fetched!",
      userData: user,
    });
  } catch (err) {
    console.log("error getting data mongodb: ", err);
    res.status(500).send({ message: "server error, please try later" });
  }
};

const getAllDoctors: RequestHandler = async (req, res) => {
  try {
    const data = await userCol
      .find<IUser>({ isDoctor: true })
      .sort({ _id: -1 })
      .project({ password: 0 })
      .limit(150)
      .toArray();

    if (!data.length) {
      res.status(404).send({ message: "Users Not Found!" });
      return;
    }
    res.status(200).send({ message: "All Users fetched", data });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
  }
};

const checkValidToken: RequestHandler = async (req, res) => {
  res.status(204);
};

export { getUserProfile, getAllDoctors, checkValidToken };
