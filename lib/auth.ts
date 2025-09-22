import api from "./api/api"
import { setAuthToken } from "./common/common"
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
  localStorage.removeItem("user")
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

// Login function
export const login =async (email: string, password: string) => {
try {
   const response = await api.post("api/auth/signin",{email,password})
    console.log("Login response:", response);
   
     if(response.status === 200){
      const user = response.data.user;
      console.log(user);
      saveUser(user)
      setAuthToken(response.data.token)
      return response
     }
    else{
      console.error("Login failed with status:");
      return response
    }
   
  
} catch (err: any) {
   console.error("Signup error:", err);
   throw new Error(err.message || "Signup failed");
}

}

// Signup function
export const signup = async (
  name: string,
  email: string,
  password: string,
  number: string
) => {
 
try {
   const res = await api.post(endpoints.auth.signin,{name,email,password,number})
   console.log("Signup response:", res);

   if(res.status === 200){
    saveEmail(email)
    return true;
   }else{
    throw new Error(res.data.message || "Signup failed");
   }
   

} catch (err: any) {

   console.error("Signup error:", err);
   throw new Error(err.message || "Signup failed");
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
    const res = await api.post(endpoints.auth.verifyOtp, { email, otp:newotp })
    return res 
  } catch (error) {
    console.error("OTP verification error:", error);
    throw new Error("OTP verification failed");
    
  }
}




// Logout function
export const logout = (): void => {
  removeUser()
}
