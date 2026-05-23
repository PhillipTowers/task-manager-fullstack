import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

// Extender Request para incluir userId
export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token requerido" });
    }

    const token = authHeader.split(" ")[1]; // Bearer TOKEN

    const decoded = jwt.verify(token, "secret123") as JwtPayload;

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};