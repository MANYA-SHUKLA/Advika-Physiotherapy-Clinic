"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, CheckCircle } from "lucide-react";

export default function BookingPage() {
  const [showNotif, setShowNotif] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Show notification
    setShowNotif(true);

    // Auto-hide after 4 seconds
    setTimeout(() => {
      setShowNotif(false);
    }, 4000);
  };

  return (
    <main className="pt-20 bg-gradient-to-br from-[#f8fdfc] via-[#f0f9f7] to-[#e6f7f3] min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#d0f6ed] to-[#ffffff] py-20 text-center shadow-inner">
        <motion.h1
          className="text-4xl md:text-6xl font-libertinus text-gray-900 mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          whileHover={{ scale: 1.05, color: "#0c332d" }}
        >
          Book an Appointment
        </motion.h1>
        <motion.p
          className="text-gray-700 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: 0.2 },
          }}
        >
          Schedule your consultation at{" "}
          <span className="font-semibold text-[#0c332d]">
            Advika Physiotherapy Clinic
          </span>
          . Select your service, choose a time, and we’ll confirm your
          appointment instantly.
        </motion.p>
      </section>

      {/* Booking Form */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#ffffff] to-[#ebfef9] border border-teal-100">
          {/* Header Strip */}
          <div className="bg-[#0c332d] text-white text-center py-6">
            <h2 className="text-2xl font-bold tracking-wide">
              Appointment Details
            </h2>
            <p className="text-sm text-gray-200">
              Please provide your information below
            </p>
          </div>

          {/* Form content */}
          <div className="relative p-10">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Select Service <span className="text-red-500">*</span>
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm">
                  <option value="">-- Choose a Service --</option>
                  <option>Post-surgery Recovery</option>
                  <option>Chronic Pain Relief</option>
                  <option>Sports Injury Rehab</option>
                  <option>Physiotherapy Consultation</option>
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <Calendar size={16} /> Preferred Date{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <Clock size={16} /> Preferred Time{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm"
                  />
                </div>
              </div>

              {/* Patient Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <User size={16} /> Full Name{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <Phone size={16} /> Phone Number{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <Mail size={16} /> Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Additional Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Any specific concerns or medical history..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm"
                ></textarea>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#0c332d] to-[#147a6c] text-white text-lg px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition"
                >
                  Confirm Booking
                </motion.button>
                <p className="text-sm text-gray-500 mt-3 text-center">
                  You will receive a confirmation email/SMS after submission.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ✅ Notification (Bottom Right) */}
      <AnimatePresence>
        {showNotif && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 bg-white border border-teal-200 shadow-xl rounded-lg px-5 py-4 flex items-center gap-3"
          >
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <p className="font-semibold text-gray-800">Booking Received</p>
              <p className="text-sm text-gray-600">
                We’ve successfully received your appointment request.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
