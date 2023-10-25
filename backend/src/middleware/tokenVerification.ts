import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
// import {} from "../../../types/index.js";
const SECRET = process.env.SECRET!;

interface IJwtPayload {
  id: string;
  exp: number;
}

export const tokenVerification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("req.cookies: ", req.cookies); //it's a security vulnerability to print token in production

  if (!req?.cookies?.Token) {
    res
      .status(401)
      .send({ message: "Include http-only credentials with every request" });
    return;
  }

  try {
    const decodedData = jwt.verify(req.cookies.Token, SECRET) as IJwtPayload;
    console.log("decodedData: ", decodedData);

    const currentTime = new Date().getTime() / 1000;

    if (decodedData?.exp < currentTime) {
      res.status(401);
      res.cookie("Token", "", {
        maxAge: 1,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.send({ message: "token expired" });
    } else {
      console.log("token approved");
      req.body.token = decodedData;
      next();
    }
    //
  } catch (err) {
    res.status(401).send("invalid token");
    console.log("🚀 ~ file: tokenVerification.ts:22 ~ ~ err:", err);
  }
};
