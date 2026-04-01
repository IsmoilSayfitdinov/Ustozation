import { AxiosError } from "axios";

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data;
    if (data.errors) {
      const firstKey = Object.keys(data.errors)[0];
      const val = data.errors[firstKey];
      return Array.isArray(val) ? val[0] : val;
    }
    if (data.detail) return data.detail;
  }
  return "Xatolik yuz berdi";
}
