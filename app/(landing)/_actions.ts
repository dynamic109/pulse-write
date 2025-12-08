"use server";
import axios from "axios";

interface RegisterData {
  email: string;
  password: string;
}

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const register = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${baseURL}/auth/register`, data);
    console.log("register response:", response.data);
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
    console.log("login response:", response);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.msg || error.message || "Registration failed";
    throw new Error(errorMessage);
  }
};
