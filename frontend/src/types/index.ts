import type { Dispatch } from "react";

type IDifficulty = "easy" | "medium" | "hard";

export interface IUser {
  _id: string;
  createdOn: Date;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

// context api

export interface IGlobalContext {
  state: IInitialData;
  dispatch: Dispatch<ActionType>;
}

export type ActionType =
  | { type: "USER_LOGIN"; payload: IUser }
  | { type: "USER_LOGOUT" }
  | { type: "CHANGE_THEME" }
  | { type: "CHANGE_NAME"; payload: string };

export interface IInitialData {
  testing: string;
  user?: IUser;
  role: null | "user" | "admin";
  isLogin: null | boolean;
  darkTheme: boolean;
}
// context api
