import React, { useState, useRef } from "react";
import { auth } from "../../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { checkValidateData } from "../../utils/validate";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const toggleForm = () => {
    setIsSignIn((prev) => !prev);
    setErrorMessage(null);
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
    } catch (error) {
      setErrorMessage(error.message);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input animation props reused
  const inputAnimation = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="animated-gradient-bg absolute inset-0 -z-10"></div>

      <motion.div
        className="max-w-md w-full p-8 bg-black bg-opacity-70 rounded-xl shadow-lg text-white z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-semibold mb-8 text-center">
          {isSignIn ? "Sign In" : "Register"}
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          {!isSignIn && (
            <motion.input
              {...inputAnimation}
              ref={nameRef}
              type="text"
              placeholder="Full Name"
              required
              className="input-field w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
            />
          )}

          <motion.input
            {...inputAnimation}
            ref={emailRef}
            type="email"
            placeholder="Email"
            required
            className="input-field w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
          />

          <motion.input
            {...inputAnimation}
            ref={passwordRef}
            type="password"
            placeholder="Password"
            required
            className="input-field w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
          />

          {errorMessage && (
            <motion.p
              className="text-red-500 mb-4 font-semibold"
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
            className={`w-full py-3 rounded-md text-lg font-semibold ${
              isSubmitting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition-colors duration-300`}
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

        <p className="mt-6 text-center text-gray-400">
          {isSignIn ? "New here?" : "Already have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="text-blue-500 hover:underline font-medium"
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
      </motion.div>

      {/* Move this CSS to your global styles or Tailwind config */}
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default Login;
