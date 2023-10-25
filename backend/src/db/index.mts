import { MongoClient, type Db } from "mongodb";
import { MONGO_URI, DB_NAME } from "../config/index.js";

let client: MongoClient;
let database: Db;

try {
  client = new MongoClient(MONGO_URI);
  database = client.db(DB_NAME);
} catch (err) {
  console.log("🚀 ~ file: db.ts:16 ~ err:", err);
}

// to know if db connection is successful
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("faqs").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.log("🚀 ~ file: index.mts:26 ~ run ~ err:", err);
  }
  // finally {
  //   // Ensures that the client will close when you finish/error
  //   await client.close();
  // }
}
run().catch(console.dir);

process.on("SIGINT", async (code) => {
  // Code to run before the server exits
  console.log(`Server is about to exit with code ${code}`);

  // Cleanup code
  // For example, you can close database connections, write logs, etc.
  await client.close();
  // process.exit(0);
});

export { database as db };

// "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/server.mjs\"",

// finally {
//   // Ensures that the client will close when you finish/error
//   await client.close(); }
