import { createMiddleware } from "redux-api-middleware";
import messageMiddleware from "./messageMiddleware";

export default [messageMiddleware, createMiddleware()];
