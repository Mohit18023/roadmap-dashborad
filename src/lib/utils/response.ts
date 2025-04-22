import { NextResponse } from "next/server";

interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

interface ApiErrorResponse {
  success: false;
  message: string;
}

export function successResponse<T>(message: string, data: T, status: number = 200) {
  const response: ApiSuccessResponse<T> = {
    success: true,
    message,
    data,
  };

  return NextResponse.json(response, { status });
}

export function errorResponse(message: string, status: number = 400) {
  const response: ApiErrorResponse = {
    success: false,
    message,
  };

  return NextResponse.json(response, { status });
}
