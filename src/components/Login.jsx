import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="m-0 p-0 h-screen w-screen bg-[url('src/assets/loginbg1.jpg')] bg-no-repeat bg-cover bg-[position:center_10%]">
            <div className="bg-black/20 h-full w-full flex items-center justify-center from-emerald-50 to-emerald-400 px-4">
                <div className="w-full max-w-md bg-white/80 rounded-2xl shadow-lg p-8">

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
                        Welcome back
                    </h1>
                    <p className="text-center text-gray-500 mt-1 mb-6">
                        Log in to continue your eco journey
                    </p>
                    {/* Form */}
                    <form className="space-y-4 text-gray-700">
                        <label className="block text-sm mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="greenophile"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2
                           focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            required
                        />
                        <label className="block text-sm mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2
                           focus:outline-none focus:ring-2 focus:ring-emerald-400"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-emerald-600 text-white py-2.5 rounded-lg
                         font-semibold hover:bg-emerald-700 transition"
                        >
                            Log In
                        </button>
                    </form>
                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-sm text-gray-400">or</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>
                    {/* Footer links */}
                    <p className="text-center text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-emerald-600 font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                    <p className="text-center text-sm mt-2">
                        <Link to="/reset-password" className="text-emerald-600 font-semibold hover:underline">I forgot my credentials</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
