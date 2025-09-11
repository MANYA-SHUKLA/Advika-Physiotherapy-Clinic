"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, CheckCircle, AlertCircle, X } from "lucide-react";

export default function BookingPage() {
  const [showNotif, setShowNotif] = useState(false);
  const [showSlotBookedPopup, setShowSlotBookedPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Client-side validation for past dates/times using IST
    const nowIST = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
    const selectedDateTime = new Date(`${formData.date}T${formData.time}:00`);
    
    // Adjust selectedDateTime to IST for accurate comparison
    const selectedDateTimeIST = new Date(selectedDateTime.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
    
    if (selectedDateTimeIST < nowIST) {
      setError("You cannot book an appointment for a time that has already passed. Please choose a future date and time.");
      setIsSubmitting(false);
      return;
    }
  
    if (!formData.service || !formData.date || !formData.time || 
        !formData.name || !formData.phone || !formData.email) {
      setError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setShowNotif(true);
        setFormData({
          service: "",
          date: "",
          time: "",
          name: "",
          phone: "",
          email: "",
          notes: ""
        });
        setTimeout(() => {
          setShowNotif(false);
        }, 4000);
      } else {
        if (response.status === 409) {
          setShowSlotBookedPopup(true);
        } else {
          setError(result.error || "Failed to book appointment. Please try again.");
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    const nowIST = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
    const todayIST = nowIST.toISOString().split('T')[0];

    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const slotDateTime = new Date(`${formData.date}T${timeString}:00`);
        
        // Adjust selectedDateTime to IST for accurate comparison
        const slotDateTimeIST = new Date(slotDateTime.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
        
        const isPast = formData.date === todayIST && slotDateTimeIST < nowIST;
        slots.push({ time: timeString, disabled: isPast });
      }
    }
    return slots;
  };

  const todayIST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const minDate = todayIST.getFullYear() + '-' + String(todayIST.getMonth() + 1).padStart(2, '0') + '-' + String(todayIST.getDate()).padStart(2, '0');
  
  const timeSlots = generateTimeSlots();

  return (
    <main className="pt-20 bg-gradient-to-br from-[#f8fdfc] via-[#f0f9f7] to-[#e6f7f3] min-h-screen">
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
          . Select your service, choose a time, and we&apos;ll confirm your
          appointment via email.
        </motion.p>
      </section>

      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#ffffff] to-[#ebfef9] border border-teal-100">
          <div className="bg-[#0c332d] text-white text-center py-6">
            <h2 className="text-2xl font-bold tracking-wide">
              Appointment Details
            </h2>
            <p className="text-sm text-gray-200">
              Please provide your information below
            </p>
          </div>
          <div className="relative p-10">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="text-red-500" size={20} />
                <p className="text-red-700">{error}</p>
              </div>
            )}
            
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Select Service <span className="text-red-500">*</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm text-gray-800"
                  required
                >
                  <option value="">-- Choose a Service --</option>
                  <option value="Post-surgery Recovery">Post-surgery Recovery</option>
                  <option value="Chronic Pain Relief">Chronic Pain Relief</option>
                  <option value="Sports Injury Rehab">Sports Injury Rehab</option>
                  <option value="Physiotherapy Consultation">Physiotherapy Consultation</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <Calendar size={16} /> Preferred Date{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={minDate}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm text-gray-800 custom-date-input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <Clock size={16} /> Preferred Time{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm text-gray-800"
                    required
                  >
                    <option value="">-- Select a Time --</option>
                    {timeSlots.map((slot) => (
                      <option key={slot.time} value={slot.time} disabled={slot.disabled}>
                        {slot.time} {slot.disabled && '(Past)'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <User size={16} /> Full Name{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <Phone size={16} /> Phone Number{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm text-gray-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <Mail size={16} /> Email Address{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm text-gray-800"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Additional Notes
                </label>
                <textarea
                  rows={4}
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any specific concerns or medical history..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm text-gray-800"
                ></textarea>
              </div>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#0c332d] to-[#147a6c] text-white text-lg px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Processing...'
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Book Appointment
                    </>
                  )}
                </motion.button>
                <p className="text-sm text-gray-500 mt-3 text-center">
                  Your booking details will be sent directly to our team. We&apos;ll confirm your appointment via email.
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg border border-teal-100">
          <h3 className="text-xl font-semibold text-[#0c332d] mb-4 flex items-center gap-2">
            <CheckCircle className="text-green-500" size={24} />
            How Booking Works
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Fill out the form above with your appointment details</li>
            <li>Click the &quot;Book Appointment&quot; button</li>
            <li>Your booking details will be sent directly to our team</li>
            <li>We&apos;ll contact you shortly to confirm your appointment via email</li>
            <li>If the selected time slot is already booked, we&apos;ll suggest alternative times</li>
          </ol>
        </div>
      </section>

      <AnimatePresence>
        {showNotif && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 bg-white border border-teal-200 shadow-xl rounded-lg px-5 py-4 flex items-center gap-3 z-50"
          >
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <p className="font-semibold text-gray-800">Booking Received</p>
              <p className="text-sm text-gray-600">
                We&apos;ve successfully received your appointment request. Confirmation email has been sent.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSlotBookedPopup && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 right-6 max-w-sm w-full p-4 bg-red-50 border-l-4 border-red-500 text-red-800 shadow-lg rounded-lg z-50"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="flex-shrink-0 mt-0.5" size={20} />
              <div className="flex-grow">
                <h3 className="font-bold text-base">Booking Conflict</h3>
                <p className="text-sm mt-1">
                  The selected slot is already booked. Please choose another date or time.
                </p>
              </div>
              <button
                onClick={() => setShowSlotBookedPopup(false)}
                className="text-red-500 hover:text-red-700 transition"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
