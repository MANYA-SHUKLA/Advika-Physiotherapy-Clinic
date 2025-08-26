"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

export default function ContactPage() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    });
  }, [controls]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setToastMessage("✅ Your message has been sent successfully!");
        setIsError(false);
        form.reset();
      } else {
        const errorData = await response.json();
        setToastMessage(`❌ ${errorData.error || "Failed to send message"}`);
        setIsError(true);
      }
    } catch (error) {
      setToastMessage("❌ Network error. Please try again later.");
      setIsError(true);
    } finally {
      setIsLoading(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  return (
    <main>
     
      <section className="bg-gradient-to-r from-[#f8f7f5] to-[#e8f5f1] py-28 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-libertinus text-gray-900 mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          whileHover={{ scale: 1.03, color: "#0c332d" }}
        >
          Contact Us
        </motion.h1>

        <motion.p
          className="text-gray-600 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          transition={{ delay: 0.2 }}
        >
          Get in touch with{" "}
          <span className="font-semibold text-[#0c332d]">
            Advika Physiotherapy Clinic
          </span>{" "}
          for appointments, inquiries, or guidance. We’re here to help you
          recover faster and live pain-free.
        </motion.p>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
       
        <motion.div
          className="w-full h-full rounded-2xl overflow-hidden shadow-lg flex items-center justify-center bg-[#f0fdfa]"
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          transition={{ delay: 0.3 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            className="w-4/5 h-4/5"
          >
            <circle cx="250" cy="250" r="230" fill="#E6F4F1" />
            <rect
              x="180"
              y="220"
              width="140"
              height="200"
              rx="25"
              fill="#34D399"
            />
            <path
              d="M200 240 Q160 300 200 360"
              stroke="#0C332D"
              strokeWidth="8"
              fill="none"
            />
            <circle cx="190" cy="370" r="12" fill="#059669" />
            <circle cx="250" cy="160" r="60" fill="#059669" />
            <circle cx="230" cy="150" r="8" fill="white" />
            <circle cx="270" cy="150" r="8" fill="white" />
            <path
              d="M230 175 Q250 190 270 175"
              stroke="white"
              strokeWidth="4"
              fill="none"
            />
          </svg>
        </motion.div>

      
        <motion.div
          className="bg-white shadow-xl rounded-2xl p-10 border border-gray-100 flex flex-col justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          transition={{ delay: 0.4 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c332d] transition bg-white text-gray-800 placeholder-gray-500"
                placeholder="Your Name"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c332d] transition bg-white text-gray-800 placeholder-gray-500"
                placeholder="you@example.com"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c332d] transition bg-white text-gray-800 placeholder-gray-500"
                placeholder="Your message..."
                required
                disabled={isLoading}
              ></textarea>
            </div>

            <motion.button
              whileHover={isLoading ? {} : { scale: 1.02, backgroundColor: "#0c332d" }}
              whileTap={isLoading ? {} : { scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-[#34d399] to-[#059669] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>
      </section>

      
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, x: 50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-6 right-6 ${isError ? 'bg-red-600' : 'bg-[#0c332d]'} text-white px-6 py-4 rounded-xl shadow-lg text-sm font-medium max-w-md`}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}