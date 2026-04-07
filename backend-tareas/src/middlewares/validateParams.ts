import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateIdParam = (paramName: string) => {
  const idSchema = z.object({
    [paramName]: z.coerce
      .number()
      .int('El id debe ser un número entero')
      .positive('El id debe ser un número positivo'),
  });

  return (req: Request, res: Response, next: NextFunction) => {
    try {
      idSchema.parse(req.params);
      next();
    } catch (error: any) {
      return res.status(400).json({
        mensaje: 'Error de validación',
        errores: error.errors,
      });
    }
  };
};