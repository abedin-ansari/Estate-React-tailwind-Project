import React from "react";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Contact = () => {
  const [result, setResult] = React.useState("");
  const [message, setMessage] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    setMessage(""); // Clear previous message
    const formData = new FormData(event.target);

    formData.append("access_key", import.meta.env.VITE_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("");
        setMessage("Message sent successfully!");
        toast.success("Form submitted successfully!");
        event.target.reset();
      } else {
        setResult("");
        setMessage(data.message || "Something went wrong");
        toast.error(data.message || "Something went wrong");
      }
    } catch {
      setResult("");
      setMessage("Network error. Please try again later.");
      toast.error("Network error. Please try again later.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-center p-6 py-20 lg:px-32 w-full overflow-hidden"
      id="Contact"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Contact
        <span className="underline underline-offset-4 decoration-1 font-light">
          With us
        </span>
      </h1>
      <p className="text-center text-gray-500 mb-12 max-w-80 mx-auto">
        Have questions or ready to start your journey? Reach out to us today!
      </p>

      <form
        className="max-w-2xl mx-auto text-gray-600 pt-8"
        onSubmit={onSubmit}
      >
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 text-left">
            Your Name
            <input
              className="w-full border border-gray-300 rounded py-3 px-4 mt-2"
              type="text"
              placeholder="Your Name"
              name="Name"
              required
            />
          </div>
          <div className="w-full max-w-md md:w-1/2 text-left md:pl-4">
            Your Email
            <input
              className="w-full border border-gray-300 rounded py-3 px-4 mt-2"
              type="email"
              placeholder="Your email"
              name="email"
              required
            />
          </div>
        </div>
        <div className="my-6 text-left">
          Message
          <textarea
            className="w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none"
            name="Message"
            placeholder="Message"
            required
          ></textarea>
        </div>

        {message && (
          <p className="text-center mb-4 text-green-600 dark:text-green-400 font-semibold">
            {message}
          </p>
        )}

        <button
          className="bg-blue-600 text-white py-2 px-12 mb-10 rounded cursor-pointer hover:bg-blue-700"
          disabled={result === "Sending...."}
        >
          {result ? result : "Send Message"}
        </button>
      </form>
    </motion.div>
  );
};

export default Contact;
