import Robot from "../assets/Robot2.png";
import Background from "../assets/bg6.jpg";
import { useState } from "react";

function Home() {
  const [rotate, setRotate] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      
      <div className="w-32 sm:w-48 md:w-64 lg:w-72 mt-20">
        <img
          src={Robot}
          onClick={() => setRotate(!rotate)}
          className={`w-full h-auto cursor-pointer transition-transform duration-500 ${
            rotate ? "rotate-360" : "rotate-0"
          }`}
        />
      </div>

     
      <div className="mt-10 text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-white font-bold">
          Hey Developer! 👋
        </h1>

        <h1 className="text-2xl sm:text-3xl md:text-4xl mt-3 text-white font-bold">
          Welcome to our App
        </h1>

        <p className="text-sm sm:text-base md:text-lg mt-4 text-white max-w-md mx-auto">
          Let's start with a quick product tour and we will have you up and running
          in no time!
        </p>
      </div>

      
      <div className="mt-6">
        <button className="border px-6 py-2 text-white rounded-full hover:bg-black transition">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Home;