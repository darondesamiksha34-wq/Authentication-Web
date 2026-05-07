import { useState } from "react";
import { MdLockOutline } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import instance from "../services/axiosConfig"; 
import background from "../assets/bg4.jpg";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const otp = location.state?.otp;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      setError("Session expired. Please try again.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await instance.post(
        "/api/auth/reset-password", 
        {
          email,
          otp,
          newPassword: password,
        }
      );

      setSuccess(res.data.message || "Password Updated");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <>
      {success && (
        <div className="fixed top-5 right-5 z-1000 bg-green-600 text-white px-6 py-3 rounded-lg">
          {success}
        </div>
      )}

      {error && (
        <div className="fixed top-5 left-5 bg-red-600 text-white px-6 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div
        className="min-h-screen flex items-center justify-center bg-cover"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="bg-gray-900 p-8 rounded-2xl text-center w-96">
          <h1 className="text-white text-2xl font-bold">New Password</h1>

          <form onSubmit={handleSubmit}>
            <div className="flex items-center bg-[#1e293b] mt-6 px-4 py-2 rounded-full">
              <MdLockOutline className="text-gray-400 mr-3" />
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-white w-full outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-blue-600 py-2 rounded-full text-white"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;





// import { useState } from "react";
// import { MdLockOutline } from "react-icons/md";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import background from "../assets/bg4.jpg";

// function ResetPassword() {
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();

//   const email = location.state?.email;
//   const otp = location.state?.otp;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !otp) {
//       setError("Session expired. Please try again.");
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     try {
     
//       const res = await axios.post(
//         "VITE_API_URL/api/auth/reset-password",
//         {
//           email,
//           otp,
//           newPassword: password,
//         }
//       );

//       setSuccess(res.data.message || "Password Updated");

//       setTimeout(() => {
//         navigate("/");
//       }, 1500);

//     } catch (err) {
//       setError(err.response?.data?.message || "Reset failed");
//     }
//   };

//   return (
//     <>
//       {success && (
//         <div className="fixed top-5 right-5 z-1000 bg-green-600 text-white px-6 py-3 rounded-lg">
//           {success}
//         </div>
//       )}

//       {error && (
//         <div className="fixed top-5 left-5 bg-red-600 text-white px-6 py-3 rounded-lg">
//           {error}
//         </div>
//       )}

//       <div
//         className="min-h-screen flex items-center justify-center bg-cover"
//         style={{ backgroundImage: `url(${background})` }}
//       >
//         <div className="bg-gray-900 p-8 rounded-2xl text-center w-96">
//           <h1 className="text-white text-2xl font-bold">New Password</h1>

//           <form onSubmit={handleSubmit}>
//             <div className="flex items-center bg-[#1e293b] mt-6 px-4 py-2 rounded-full">
//               <MdLockOutline className="text-gray-400 mr-3" />
//               <input
//                 type="password"
//                 placeholder="Enter new password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="bg-transparent text-white w-full outline-none"
//               />
//             </div>

//             <button
//               type="submit"
//               className="mt-6 w-full bg-blue-600 py-2 rounded-full text-white"
//             >
//               Reset Password
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ResetPassword;













