import { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import instance from "../services/axiosConfig"; // adjust path

function Navbar() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    } catch {
      setUser(null);
    }
  }, []);

  const getInitial = () => {
    if (!user || !user.email) return "";
    return user.email.charAt(0).toUpperCase();
  };




const handleLogout = async () => {
  try {
    await instance.post("/api/auth/logout");

    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  } catch (err) {
    console.log("Logout error:", err);
  }
};

  return (
    <div className="fixed top-0 left-0 w-full bg-white px-4 sm:px-6 py-3 flex items-center justify-between shadow-md z-50">

      
      <div className="flex items-center gap-2">
        <img src={Logo} className="w-8 sm:w-10 h-auto" />
        <h1 className="text-xl sm:text-2xl font-bold">Auth</h1>
      </div>

    
      {user ? (
        <div className="relative">
          
  
          <div
            onClick={() => setShowLogout(!showLogout)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white font-bold cursor-pointer"
          >
            {getInitial()}
          </div>

      
          {showLogout && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded px-4 py-2">
              <button
                onClick={handleLogout}
                className="text-black hover:text-blue-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/signin")}
          className="border px-4 py-1 sm:px-5 sm:py-2 rounded-full text-sm sm:text-base hover:text-blue-600 transition"
        >
          Login →
        </button>
      )}
    </div>
  );
}

export default Navbar;












