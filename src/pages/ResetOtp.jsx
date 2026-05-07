import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import instance from "../services/axiosConfig"; 
import background from "../assets/bg4.jpg";

function ResetOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setError("Enter full 6-digit OTP");
      return;
    }

    try {
      const res = await instance.post(
        "/api/auth/is-auth",   
        { otp: finalOtp }
      );

      setSuccess(res.data.message || "OTP Verified");

      setTimeout(() => {
        navigate("/resetpassword", {
          state: { email, otp: finalOtp },
        });
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover"
      style={{ backgroundImage: `url(${background})` }}
    >

      {error && (
        <div className="fixed top-5 right-5 bg-red-500 text-white px-6 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="fixed top-5 right-5 z-1000 bg-green-600 text-white px-6 py-3 rounded-lg">
          {success}
        </div>
      )}

      <div className="bg-gray-900 p-8 rounded-2xl text-center">

        <h1 className="text-white text-2xl font-bold">Enter OTP</h1>

        <p className="text-gray-300 mt-2">
          OTP sent to: {email}
        </p>

        <div className="flex gap-3 mt-6 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center bg-gray-500 text-white rounded-lg"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-600 px-6 py-2 rounded-full text-white"
        >
          Verify OTP
        </button>

      </div>
    </div>
  );
}

export default ResetOtp;





// import { useState, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import background from "../assets/bg4.jpg";

// function ResetOtp() {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

  
//   const navigate = useNavigate();
//   const location = useLocation();

//   const email = location.state?.email;

//   const inputsRef = useRef([]);

//   const handleChange = (value, index) => {
//     if (!/^[0-9]?$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       inputsRef.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputsRef.current[index - 1].focus();
//     }
//   };

//   const handleSubmit = async () => {
//     const finalOtp = otp.join("");

//     if (finalOtp.length !== 6) {
//       setError("Enter full 6-digit OTP");
//       return;
//     }

//     try {
//       const res = await axios.post(
//       "VITE_API_URL/api/auth/is-auth",
//       { otp: finalOtp },
//       { withCredentials: true } 
// );
      
//       setSuccess(res.data.message || "OTP Verified");

//       setTimeout(() => {
//         navigate("/resetpassword", {
//           state: { email, otp: finalOtp },
//         });
//       }, 1000);

//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid OTP");
//     } 
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-cover"
//       style={{ backgroundImage: `url(${background})` }}>

//       {error && (
//         <div className="fixed top-5 right-5 bg-red-500 text-white px-6 py-3 rounded-lg">
//           {error}
//         </div>
//       )}

//       {success && (
//         <div className="fixed top-5 right-5 z-1000 bg-green-600 text-white px-6 py-3 rounded-lg">
//           {success}
//         </div>
//       )}
      

//       <div className="bg-gray-900 p-8 rounded-2xl text-center">

//         <h1 className="text-white text-2xl font-bold">Enter OTP</h1>

//         <p className="text-gray-300 mt-2">
//           OTP sent to: {email}
//         </p>

//         <div className="flex gap-3 mt-6 justify-center">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               maxLength="1"
//               value={digit}
//               ref={(el) => (inputsRef.current[index] = el)}
//               onChange={(e) => handleChange(e.target.value, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               className="w-12 h-12 text-center bg-gray-500 text-white rounded-lg"
//             />
//           ))}
//         </div>
//         <button
//           onClick={handleSubmit}
//           className="mt-6 bg-blue-600 px-6 py-2 rounded-full text-white"
//         >
//           Verify OTP
//         </button>

//       </div>
//     </div>
//   );
// }
// export default ResetOtp;


















