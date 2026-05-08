import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import instance from "../services/axiosConfig";
import BG from "../assets/bg4.jpg";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email.trim()) {
//       setError("Email is required");
//       return;
//     }

//     if (!email.includes("@")) {
//       setError("Enter a valid email");
//       return;
//     }

//     try {
//       await instance.post("/api/auth/send-reset-otp", {
//   email,
// });

//       setSuccess("OTP sent successfully ");

//       setTimeout(() => {
//         navigate("/resetOtp", { state: { email } });
//       }, 1500);

//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to send OTP");
//       setTimeout(() => setError(""), 3000);
//     }
//   };


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email.trim()) {
    setError("Email is required");
    return;
  }

  try {
    const res = await instance.post(
      "/api/auth/send-reset-otp",
      { email }
    );

    if (res.data.success) {
      setSuccess(res.data.message);

      setTimeout(() => {
        navigate("/resetOtp", {
          state: { email },
        });
      }, 1500);

    } else {
      setError(res.data.message);
    }

  } catch (err) {
    console.log(err);

    setError(
      err.response?.data?.message ||
      "Failed to send OTP"
    );
  }
};

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="bg-gray-900 w-115 p-8 rounded-xl text-center shadow-lg shadow-gray-500/50">

        <h1 className="text-white text-2xl font-bold">
          Reset Password
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Enter your registered email id
        </p>

        {success && (
          <p className="text-green-400 mt-3">{success}</p>
        )}

        {error && (
          <p className="text-red-500 text-sm mt-3">{error}</p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="flex items-center bg-[#1e293b] mt-6 px-4 py-2 rounded-full">
            <MdOutlineEmail className="text-gray-400 text-lg mr-3" />
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent text-white w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-2 rounded-full text-white font-medium 
            bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition"
          >
            Send OTP
          </button>

        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;

