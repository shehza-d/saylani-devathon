import express from "express";
import { PORT } from "./config/index.js";
import { middlewareRouter } from "./middleware/index.mjs";
import { userProfileRouter, crudRouter, authRouter } from "./routes/index.js";
import { tokenVerification } from "./middleware/tokenVerification.js";

const app = express();
const version = "/api/v1";

//

app.use(version, middlewareRouter);

// not secure routes
app.use(version, authRouter); // this includes login signup

// middleware token verification
app.use(version, tokenVerification);

// secure routes
app.use(version, crudRouter);
app.use(version, userProfileRouter);

app.get("/testing", (req, res) => res.send("Devathon server testing v1.3"));

app.use((req, res) => res.status(404).send("No route matched"));

app.listen(PORT, () => console.log(`app listening on ===>>> ${PORT}`));

// to host you frontend on the server
// import path from "path";
// const __dirname = path.resolve();
// app.use("/", express.static(path.join(__dirname, "./public/build")));
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname + "./public/build/index.html"))
// );
