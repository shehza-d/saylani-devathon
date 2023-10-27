import type { ObjectId } from "mongodb";

export interface IUser {
  _id?: ObjectId;
  createdOn: Date;
  name: string;
  email: string;
  password: string;
  isAdmin:boolean
}

export interface IFaq {//remove
  _id?: ObjectId;
  createdOn: Date;
  question: string;
  answer: string;
  topic: string;
}
