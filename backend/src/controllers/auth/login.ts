import type { Request, Response, NextFunction } from "express";

export const loginHandler = async (req: Request, res: Response) => {
  console.log("🚀 ~ file: login.ts:4 ~ login ~ req:", req);
};
