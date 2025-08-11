import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@utils/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { checkValidateData } from "@utils/validate.js";
import { toast, ToastContainer } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const toggleForm = () => {
    setIsSignIn((prev) => !prev);
    setErrorMessage(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const name = nameRef.current?.value || "";
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const validationError = checkValidateData(
      isSignIn ? null : name,
      email,
      password
    );

    if (validationError) {
      setErrorMessage(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      if (isSignIn) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully!");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, { displayName: name });
        toast.success("Registered successfully!");
      }
      setErrorMessage(null);

      // Navigate to home after short delay so toast can be seen
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputAnimation = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Animated Gradient Background */}
      <div className="animated-gradient-bg absolute inset-0 -z-10"></div>

      <motion.div
        className="max-w-md w-full p-4 sm:p-6 md:p-8 bg-black bg-opacity-70 rounded-xl shadow-lg text-white z-10 mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center">
          {isSignIn ? "Sign In" : "Register"}
        </h2>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 sm:space-y-6"
        >
          {!isSignIn && (
            <motion.input
              {...inputAnimation}
              ref={nameRef}
              type="text"
              placeholder="Full Name"
              required
              className="input-field w-full px-3 sm:px-4 py-3 sm:py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 text-base"
            />
          )}

          <motion.input
            {...inputAnimation}
            ref={emailRef}
            type="email"
            placeholder="Email"
            required
            className="input-field w-full px-3 sm:px-4 py-3 sm:py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 text-base"
          />

          <div className="relative">
            <motion.input
              {...inputAnimation}
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="input-field w-full px-3 sm:px-4 py-3 sm:py-3 pr-12 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 text-base"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:text-white p-2 touch-manipulation"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          {isSignIn && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium cursor-pointer transition-colors duration-200 py-2 px-1 touch-manipulation"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {errorMessage && (
            <motion.p
              className="text-red-500 text-sm sm:text-base font-semibold text-center"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
            >
              {errorMessage}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 sm:py-3 px-4 rounded-md text-base sm:text-lg font-semibold ${
              isSubmitting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            } transition-colors duration-300 cursor-pointer touch-manipulation min-h-[44px]`}
          >
            {isSubmitting
              ? isSignIn
                ? "Signing In..."
                : "Registering..."
              : isSignIn
              ? "Sign In"
              : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm sm:text-base">
          {isSignIn ? "New here?" : "Already have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="text-blue-500 hover:underline font-medium cursor-pointer touch-manipulation py-1 px-1"
            aria-label="Toggle form"
          >
            {isSignIn ? "Register Now" : "Sign In"}
          </button>
        </p>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnFocusLoss={false}
          pauseOnHover
          draggable={false}
          theme="dark"
        />

        {/* Forgot Password Component */}
        <ForgotPassword
          isOpen={showForgotPassword}
          onClose={() => setShowForgotPassword(false)}
        />
      </motion.div>

      <style>
        {`
    .animated-gradient-bg {
      background: linear-gradient(
        270deg,
        #ff6ec4,
        #7873f5,
        #4ade80,
        #facc15,
        #f97316,
        #3b82f6,
        #d946ef,
        #14b8a6
      );
      background-size: 1600% 1600%;
      animation: gradientAnimation 15s ease infinite;
      filter: brightness(0.75);
    }
    @keyframes gradientAnimation {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    
    /* Mobile-specific optimizations */
    @media (max-width: 640px) {
      .input-field {
        font-size: 16px; /* Prevents zoom on iOS */
      }
    }
  `}
      </style>
    </div>
  );
};

export default Login;
