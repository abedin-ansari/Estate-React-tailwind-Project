import React, { useState } from "react";
import { auth } from "/utils/firebase.js";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ForgotPassword = ({ isOpen, onClose }) => {
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsResetting(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent! Check your inbox.");
      onClose();
      setResetEmail("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsResetting(false);
    }
  };

  const handleClose = () => {
    setResetEmail("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <motion.div
        className="bg-gray-800 rounded-xl p-4 sm:p-6 w-full max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-white">
            Reset Password
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer p-2 touch-manipulation"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-gray-300 text-sm sm:text-base">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          <input
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-3 sm:px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 text-base"
          />

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-2.5 sm:py-2 px-4 rounded-md bg-gray-600 hover:bg-gray-700 text-white transition-colors duration-200 cursor-pointer touch-manipulation min-h-[44px] text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isResetting}
              className={`flex-1 py-2.5 sm:py-2 px-4 rounded-md ${
                isResetting
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              } text-white transition-colors duration-200 cursor-pointer touch-manipulation min-h-[44px] text-sm sm:text-base`}
            >
              {isResetting ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
