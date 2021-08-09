/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receber o token
  const authToken = request.headers.authorization;

  // Validar se token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  // const token = authToken.split(" ")[1];
  const [, token] = authToken.split(" ");

  try {
    // Validar se token é valido
    const { sub } = verify(
      token,
      "74c89ac305581bbadb811440acf8d789"
    ) as IPayload;

    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
