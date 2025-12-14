"use server";
import { setSession, setUserEmail } from "@/lib/app-services/session";
import axios from "axios";

interface RegisterData {
  email: string;
  password: string;
}

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const register = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${baseURL}/auth/register`, data);
    await setUserEmail(data.email);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.msg || error.message || "Registration failed";
    throw new Error(errorMessage);
  }
};

export const login = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, data);
    await setSession(response.data.token);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.msg || error.message || "Registration failed";
    throw new Error(errorMessage);
  }
};

export const verify = async (code: string, email: string) => {
  try {
    const response = await axios.post(`${baseURL}/auth/verify`, {
      code,
      email,
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.msg || error.message || "Registration failed";
    throw new Error(errorMessage);
  }
};

export const resendCode = async (email: string) => {
  try {
    const response = await axios.post(`${baseURL}/auth/resend-code`, {
      email,
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.msg || error.message || "Registration failed";
    throw new Error(errorMessage);
  }
};
