import { message } from "antd"
import api from "./api/api"
import { errorResponse, setAuthToken } from "./common/common"
import endpoints from "./endpoints/endponts"

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null

  const userData = localStorage.getItem("user")
  return userData ? JSON.parse(userData) : null
}

// Save user to localStorage
export const saveUser = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user))
}

// Remove user from localStorage
export const removeUser = (): void => {
  localStorage.clear();
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null
}


export const saveEmail =(email:string): void=>{
  localStorage.setItem("email",email)
}
export const getEmail =(): string | null=>{
  return localStorage.getItem("email")
}

// Clear email from localStorage
export const clearEmail =(): void=>{
  localStorage.removeItem("email")
}


export const login = async (email: string, password: string) => {
  try {
    const response = await api.post(endpoints.auth.signin, { email, password });
    console.log("Login response:", response);

    if (response.status === 200) {
      const user = response.data.user;
      // setAuthToken(response.data.token); // Set token for future requests
      return { success: true, user, token: response.data.token };
    } else {
      // Handle unexpected status codes
      const message = errorResponse(response);
      console.error("Login failed:", message);
      return { success: false, message };
    }
  } catch (err: any) {
    // Network errors or Axios errors
    const message = errorResponse(err);
    console.error("Login error:", message);
    return { success: false, message };
  }
};


// Signup function
export const signup = async (
  name: string,
  email: string,
  password: string,
  number: string
) => {
 
try {
   const response = await api.post(endpoints.auth.signup,{name,email,password,number})
   console.log("Signup response:", response);

   if(response.status === 201 || response.status === 200){
    saveEmail(email)
    return {success: true,message:response?.data?.message};
   }else{
      const message = errorResponse(response);
      console.error("Signup failed:", message);
      return { success: false, message };
   }
} catch (err: any) {
   // Network errors or Axios errors
    const message = errorResponse(err);
    console.error("Signup error:", message);
    return { success: false, message };
}
}

// Verify OTP function

export const verifyOtp = async (otp: string)=>{
  const email = getEmail();
  if(!email){
    throw new Error("Email not found for OTP verification");
  }
  try {
    const newotp = otp.toString()
    const response = await api.post(endpoints.auth.verifyOtp, { email, otp:newotp })

    if( response.status === 200){
      return { success: true, status: 200 };
    }
    else{
      const message = errorResponse(response);
      console.error("OTP verification failed:", message);
      return { success: false, message };
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    const message = errorResponse(error);
    return { success: false, message };
    
  }
}




// Logout function
export const logout = (): void => {
  removeUser()
}
