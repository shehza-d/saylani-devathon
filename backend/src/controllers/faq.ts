import { IFaq } from "../types/index.js";
import { db } from "../db/index.mjs";
import { ObjectId } from "mongodb";
// import { getEmbeddings, cleanText } from "../helpers/index.js";
import type { Request, Response } from "express";

const collection = "faqs";
const faqsCollection = db.collection<IFaq>(collection);

const getAllFaqs = async (req: Request, res: Response) => {
  try {
    const data = await faqsCollection
      .find<IFaq>({})
      .sort({ _id: -1 })
      // .project({ password: 0 })
      .limit(150)
      .toArray();

    if (!data.length) {
      res.status(404).send({ message: "Questions Not Found" });
      return;
    }

    res.status(200).send({ message: "All Faqs fetched", data });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
  }
};

const getFaq = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(403).send({ message: "Incorrect FAQ id" });
    return;
  }

  try {
    const query = { _id: new ObjectId(id) };

    const data = await faqsCollection.findOne<IFaq>(query);

    if (!data) throw Error("FAQ Not Found!");

    res.send({ message: "FAQ found", data });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
  }
};

const addFaq = async (req: Request, res: Response) => {
  let { question, answer, topic } = req.body;

  // Validation
  if (
    !question ||
    !answer ||
    !topic ||
    typeof question !== "string" ||
    typeof answer !== "string" ||
    typeof topic !== "string"
  ) {
    res.status(403).send({ message: "Required parameter missing!" });
    return;
  }

  try {
    const doc = {
      question,
      answer,
      topic,
      createdOn: new Date(),
    };
    const data = await faqsCollection.insertOne(doc);

    if (data.acknowledged)
      res.status(201).send({
        message: "New FAQ Created!",
        id: data.insertedId.toString(),
      });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
  }
};

const updateFaq = async (req: Request, res: Response) => {
  const { question, answer, topic } = req.body;
  const { id } = req.params;

  // Validation
  if (!ObjectId.isValid(id)) {
    res.status(403).send({ message: "Incorrect FAQ id" });
    return;
  }

  if ((!question && !topic && !answer) || !id) {
    res.status(403).send({ message: "Required parameter missing!" });
    return;
  }
  if (question && (typeof question !== "string" || question.length > 250)) {
    res.status(403).send("question missing");
    return;
  }
  if (answer && (typeof answer !== "string" || answer.length > 250)) {
    res.status(403).send("answer missing");
    return;
  }
  

  let faq: Partial<IFaq> = {};

  answer && (faq.answer = answer);
  question && (faq.question = question);
  topic && (faq.topic = topic);

  try {
    const filter = { _id: new ObjectId(id) };
    const updateDoc = { $set: faq };
    const data = await faqsCollection.updateOne(filter, updateDoc);

    if (!data.matchedCount) throw Error("FAQ Not Found!");

    res.status(201).send({ message: "FAQ updated" });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
  }
};

const deleteFaq = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(403).send({ message: "Incorrect FAQ id" });
    return;
  }
  try {
    const query = { _id: new ObjectId(id) };
    const result = await faqsCollection.deleteOne(query);

    if (!result.deletedCount)
      throw new Error("No documents matched the query. Deleted 0 documents.");

    res.status(201).send({ message: "Successfully deleted one document." });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
  }
};
const deleteAllFaqs = async (req: Request, res: Response) => {};

export { getAllFaqs, getFaq, addFaq, updateFaq, deleteFaq, deleteAllFaqs };
