import type { ObjectId } from "mongodb";

export interface IFaq {
  _id?: ObjectId;
  createdOn: Date;
  question: string;
  answer: string;
  topic: string;
}
