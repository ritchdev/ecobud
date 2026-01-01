import { Link } from "react-router-dom";
import { useState } from "react";

export default function Test() {
    const [pageForm, setPageForm] = useState("login")   //'login' State for normal login and 'reset' State for Reset Credentials

    return (
        <div className="m-0 p-0 h-screen w-screen bg-[url('src/assets/loginbg1.jpg')] bg-no-repeat bg-cover bg-[position:center_10%]">
            <div className="bg-black/30 h-full w-full flex items-center justify-center from-emerald-50 to-emerald-400 px-4">
                <div className="w-full max-w-md bg-emerald-50/60 rounded-2xl shadow-lg p-8 border-1 border-emerald-600">
                    {/* Logo */}
                    <div className="flex justify-center">
                        <img
                            src="src/assets/logo.png"
                            alt="EcoBud"
                            className="h-12 w-auto"
                        />
                    </div>
                    {/* Heading */}
                    <h1 className="text-2xl font-semibold text-center text-emerald-700">
                        {pageForm === 'login' ? "Welcome Back!" : "Reset Credentials"}
                    </h1>
                    <p className="text-center text-gray-500 mt-1 mb-6">
                        Enter the email linked with your EcoBud account to reset your credentials
                    </p>
                    {/* Form */}
                    <form className="space-y-4 text-gray-700">
                        <label className="block text-sm mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder=" you@ecobud.com"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2
                           focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-emerald-600 text-white py-2.5 rounded-lg
                         font-semibold hover:bg-emerald-700 transition"
                        >
                            Send Email
                        </button>
                    </form>
                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <div className="flex-1 h-[0.5px] bg-gray-400"></div>
                        <span className="text-sm text-gray-600">or</span>
                        <div className="flex-1 h-[0.5px] bg-gray-400"></div>
                    </div>
                    {/* Footer links */}
                    <p className="text-center text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-emerald-600 font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                    <p className="text-center text-sm text-gray-600 pt-2">
                        Already Registered?{" "}
                        <Link to="/login" className="text-emerald-600 font-medium hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
