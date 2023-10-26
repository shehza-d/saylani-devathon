import express from "express";
import { crudRouter } from "./routes/index.js";
import { PORT } from "./config/index.js";
import { middlewareRouter } from "./middleware/index.mjs";
import { authRouter } from "./routes/auth/index.js";
import { tokenVerification } from "./middleware/tokenVerification.js";

const app = express();
const version = "/api/v1";

app.use(version, middlewareRouter);

// not secure routes
app.use(version, authRouter); // this includes login signup

// middleware token verification
// app.use(version, tokenVerification);

// secure routes
// app.use('/api/v1', productApis)
// app.use('/api/v1', tweetApi)
// app.post('/api/v1/change-password', psw)
// app.get('/api/v1/users', s)

app.use(version, crudRouter);

app.get("/testing", (req, res) => res.send("Devathon server testing"));

// app.get("/", express.static(path.join(__dirname, "./public/index.html")));
app.use((req, res) => res.send("No route matched"));

app.listen(PORT, () => console.log(`app listening on ===>>> ${PORT}`));

// import path from "path";
// const __dirname = path.resolve();
