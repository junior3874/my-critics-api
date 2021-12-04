import { Controller } from "@/presentation/interfaces/Controller";

import { Request, Response } from "express";

export const adapterRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      accountId: req.accountId,
    };

    try {
      const httpResponse = await controller.handler(request);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (err) {
      res.status(500).json({
        error: "internal server error",
      });
    }
  };
};
