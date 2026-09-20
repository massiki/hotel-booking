import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export const ButtonLoginGoogle = () => {
  return (

    <button
      onClick={() => signIn("google")}
      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm cursor-pointer"
    >
      <FcGoogle className="w-6 h-6" />
      Masuk dengan Google
    </button>
  )
}

