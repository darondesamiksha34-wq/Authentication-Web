function Avatar({ name = "", email = "" }) {
  const letter = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase();

  return (
    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold">
      {letter}
    </div>
  );
}

export default Avatar;