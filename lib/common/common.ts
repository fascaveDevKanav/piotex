export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }
  return null;
};

export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
};


export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
  }
};


export const errorResponse =(response : any)=>{
  console.log("Error response:", response);
  if(response?.response?.data?.message){
   return response?.response?.data?.message || "An error occurred";
  }
 

  
  // Network error or other errors
  if (response.message) {
    return response.message;
  }

  // Fallback
  return "An unexpected error occurred";
}