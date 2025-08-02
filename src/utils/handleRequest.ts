// src/utils/handleRequest.ts
import { AxiosError } from "axios";


export async function handleRequest<T>(
  requestFn: () => Promise<T>
): Promise<T> {
  try {
    const response = await requestFn();
    return response;
  } catch (error) {
    const message =
      error instanceof AxiosError && error.response?.data?.message
        ? error.response.data.message
        : error instanceof Error
          ? error.message
          : "Erreur inconnue";

    throw new Error(message);
  }
}
