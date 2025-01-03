"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";


export default function LoginPage() {
    const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message
  const [forgotPassword, setForgotPassword] = useState(false); // State to track forgot password click
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Hardcoded email and password
    if (email === "yeab123@gmail.com" && password === "12345678") {
      router.push("/profile"); // Redirect to profile page
    } else {
      setError("Invalid email or password"); // Set error message
    }
  };

  const handleForgotPassword = () => {
    setForgotPassword(true); // Show the "contact admin" message
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "am" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div
      className="relative flex h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://www.bus-planet.com/bus/pictures/Ethiopia/JN/400/B2003-02-002.jpg')",
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative m-auto bg-white rounded-3xl shadow-2xl flex max-w-4xl">
        <div className="w-96 p-5">
        <button
            onClick={toggleLanguage}
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md w-full text-center"
          >
            {t("sidebar.toggle")}
          </button>
          <div className="text-left font-bold text-2xl text-black">
            IETP<span className="text-gray-500">route</span>
          </div>
          <div className="py-10">
            <h2 className="text-3xl font-bold text-black mb-2">Welcome Back</h2>
            <div className="border-2 w-32 border- inline-block mb-6 mt-2"></div>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="relative">
                <Mail className="absolute text-gray-800 left-2 top-3 h-5 w-5" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border border-gray-300 rounded-lg py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition duration-300"
                />
              </div>
              {error && error.includes("email") && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
              <div className="relative">
                <Lock className="absolute text-gray-800 left-2 top-3 h-5 w-5" />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border border-gray-300 rounded-lg py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition duration-300"
                />
              </div>
              {error && error.includes("password") && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
              <div className="flex justify-between items-center text-gray-500">
                <a
                  href="#"
                  onClick={handleForgotPassword}
                  className="text-sm hover:text-gray-800 transition duration-300"
                >
                  Forgot password?
                </a>
              </div>
              {forgotPassword && (
                <p className="text-blue-500 text-sm mt-2">
                  Please contact the admin for password recovery.
                </p>
              )}
              <Button
                type="submit"
                className="bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition duration-300 flex items-center justify-center"
              >
                Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
