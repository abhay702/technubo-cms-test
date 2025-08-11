import { Request, Response, NextFunction } from "express";

// Middleware to validate request body
export const validateRequest = (schema: any) => {
  /**
   * Middleware function to validate the request body against a given schema.
   *
   * @param req - Express Request object.
   * @param res - Express Response object.
   * @param next - Express NextFunction to pass control to the next middleware.
   */
  const middleware = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error", details: error.details });
    }
    next(); // Ensure this is called when validation passes
  };

  // Set the name of the middleware function for better debugging and logging
  Object.defineProperty(middleware, "name", {
    value: `validateRequest`,
  });

  return middleware;
};
