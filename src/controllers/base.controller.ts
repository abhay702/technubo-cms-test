// controllers/BaseControllerService.ts
// Purpose:
// This class provides shared response handling methods for consistency across controllers.
//
// Created By: Ravi
// Date: 2024-12-30

import { Response } from "express";
import { ResponseInterface } from "../interfaces/response.interface";

/**
 * BaseControllerService
 *
 * Provides shared response handling methods for consistency across controllers.
 */
export class BaseControllerService {
  /**
   * Handles sending a standardized response to the client.
   *
   * @template T - The type of data being sent in the response.
   * @param {Object} params - The parameters object.
   * @param {Response} params.res - Express Response object.
   * @param {ResponseInterface<T>} params.response - Standardized response interface.
   *
   * @returns {void}
   *
   * @example
   * this.handleResponse({
   *   res,
   *   response: {
   *     statusCode: 200,
   *     response: {
   *       status: 1,
   *       message: "Success",
   *       data: { user: { id: 1, name: "John" } },
   *     },
   *   },
   * });
   *
   * // Response:
   * // Status: 200
   * // Body: { "status": 1, "message": "Success", "data": { "user": { "id": 1, "name": "John" } } }
   */
  protected handleResponse<T>({
    res,
    response,
  }: {
    res: Response;
    response: ResponseInterface<T>;
  }): void {
    res.status(response.statusCode).json(response.response);
  }
}
