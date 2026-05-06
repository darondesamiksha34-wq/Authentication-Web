import instance from "./axiosConfig";

//Signup user
export const registerUser = async (data) => {
  try {
    const response = await instance.post("/api/auth/signup", data);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data || error.message);
    throw error;
  }
};

// Login user
export const loginUser = async (data) => {
  try {
    const response = await instance.post("/api/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await instance.post("/logout");
    return response.data;
  } catch (error) {
    console.error("Logout Error:", error.response?.data || error.message);
    throw error;
  }
};

//Password user
export const resetPassword = async () => {
  try {
    const response = await instance.post("/api/auth/reset-password");
    return response.data;
  } catch (error) {
    console.error("Logout Error:", error.response?.data || error.message);
    throw error;
  }
};

//otp

// export const sendResetOtp = async () => {
//   try {
//     const response = await instance.post("/api/auth/send-reset-otp");
//     return response.data;
//   } catch (error) {
//     console.error("Logout Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

export const sendResetOtp = async (email) => {
  try {
    const response = await instance.post(
      "/api/auth/send-reset-otp",
      { email }
    );
    return response.data;
  } catch (error) {
    console.error("OTP Error:", error.response?.data || error.message);
    throw error;
  }
};