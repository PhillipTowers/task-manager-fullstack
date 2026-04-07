import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // Error de validación Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      mensaje: "Error de validación",
      errores: err.issues.map(issue => ({
        campo: issue.path[0],
        mensaje: issue.message,
      })),
    });
  }

  // Error controlado de negocio
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      mensaje: err.message,
    });
  }

  // Error inesperado
  console.error(err);

  return res.status(500).json({
    mensaje: "Error interno del servidor",
  });
};