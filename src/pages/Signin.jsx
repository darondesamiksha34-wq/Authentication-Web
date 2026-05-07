import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "../assets/signin2.jpg";
import instance from "../services/axiosConfig"; 

function Signin() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const showMessage = (msg, msgType = "success") => {
    setMessage(msg);
    setType(msgType);

    setTimeout(() => {
      setMessage("");
      setType("");
    }, 3000);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !email || !password) {
    showMessage("All fields are required", "error");
    return;
  }

  try {


const res = await instance.post("/api/auth/register", {
  name,
  email,
  password,
});

    console.log("REGISTER RESPONSE:", res.data);

    if (res.data.success) {
   
      localStorage.setItem("user", JSON.stringify(res.data.user));

      showMessage("Account created successfully", "success");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      showMessage(res.data.message || "Signup failed", "error");
    }

  } catch (err) {
    console.error(err);
    showMessage("Something went wrong", "error");
  }
};

  return (
    <>
      {message && (
        <div
          className={`fixed top-5 right-5 z-1000 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300
          ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {message}
        </div>
      )}

    
      <div
        className="min-h-screen flex items-center justify-center px-4 p-5 bg-cover bg-center"
        style={{ backgroundImage: `url(${Signup})` }}
      >
        <div className="w-90 rounded-xl overflow-hidden shadow-lg">

          <div
            className="flex flex-col w-full p-5 h-60 justify-center items-center bg-cover"
            style={{ backgroundImage: `url(${Signup})` }}
          >
            <p className="text-white text-3xl font-bold mt-10">
              Create Account
            </p>
            <p className="text-white text-md mt-3">
              Create Your Account
            </p>
          </div>

          <div className="bg-white w-full p-5 flex flex-col gap-4">
            <form onSubmit={handleSubmit}>

              <input
                type="text"
                value={name}
                required
                minLength={3}
                className="h-9 w-full rounded-xl bg-purple-200 mt-3 p-3 outline-none"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="email"
                value={email}
                required
                className="h-9 w-full rounded-xl bg-purple-200 mt-3 p-3 outline-none"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                value={password}
                required
                minLength={6}
                className="h-9 w-full rounded-xl bg-purple-200 mt-3 p-3 outline-none"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => navigate("/forgotpassword")}
                className="text-blue-900 cursor-pointer underline text-sm mt-2"
              >
                Forgot Password
              </button>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="h-10 w-32 bg-purple-700 rounded-2xl text-white hover:bg-purple-800 transition"
                >
                  Login
                </button>
              </div>

              <div className="flex gap-1 justify-center mt-4">
                <span className="text-black text-sm">
                  Already have an account?
                </span>
                <button
                  type="button"
                  
                  className="text-blue-500 text-sm underline"
                >
                  Login here
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;













// const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!name || !email || !password) {
  //     showMessage("All fields are required", "error");
  //     return;
  //   }

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5000/api/auth/register",
  //       { name, email, password },
  //       { withCredentials: true }
  //     );

  //     console.log("Success:", res.data);

  //     showMessage("Account created successfully", "success");

  //     setName("");
  //     setEmail("");
  //     setPassword("");

  //   } catch (err) {
  //     console.error("Error:", err);

  //     showMessage(
  //       err.response?.data?.message || "Signup failed",
  //       "error"
  //     );
  //   }
  // };









