// interfaces/response.interface.ts
// Purpose:
// This file defines the interface for the standard response structure used across the application.
//
// Created By: Ravi
// Date: 2024-12-30

/**
 * ResponseInterface
 *
 * Interface for the standard response structure.
 *
 * @template T - The type of the data included in the response.
 */
export interface ResponseInterface<T> {
  statusCode: number; // HTTP status code of the response
  response: {
    status: number; // Custom status code indicating success or failure
    message: string; // Message describing the response
    data: T;
  };
}
