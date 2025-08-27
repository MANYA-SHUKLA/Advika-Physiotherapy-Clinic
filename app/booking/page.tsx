"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, CheckCircle, MessageCircle } from "lucide-react";

export default function BookingPage() {
  const [showNotif, setShowNotif] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  };

  const sendToWhatsApp = (data: typeof formData) => {
  
    const message = `New Booking Request:%0A%0A
*Service*: ${data.service}%0A
*Date*: ${data.date}%0A
*Time*: ${data.time}%0A
*Name*: ${data.name}%0A
*Phone*: ${data.phone}%0A
*Email*: ${data.email}%0A
*Additional Notes*: ${data.notes || 'None'}`;

    const whatsappUrl = `https://wa.me/918005586588?text=${message}`;
    

    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
     
      sendToWhatsApp(formData);
      
     
      const response = await fetch('/api/booking/send-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
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
       
        setShowNotif(true);
        setTimeout(() => {
          setShowNotif(false);
        }, 4000);
      }
    } catch (error) {
      console.error('Error:', error);
    
      setShowNotif(true);
      setTimeout(() => {
        setShowNotif(false);
      }, 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          appointment instantly.
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
                  <option>Post-surgery Recovery</option>
                  <option>Chronic Pain Relief</option>
                  <option>Sports Injury Rehab</option>
                  <option>Physiotherapy Consultation</option>
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm text-gray-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                    <Clock size={16} /> Preferred Time{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm text-gray-800"
                    required
                  />
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
                  <Mail size={16} /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm text-gray-800"
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
                      <MessageCircle size={20} />
                      Send via WhatsApp
                    </>
                  )}
                </motion.button>
                <p className="text-sm text-gray-500 mt-3 text-center">
                  Your booking details will open in WhatsApp. Please click send to confirm.
                </p>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg border border-teal-100">
          <h3 className="text-xl font-semibold text-[#0c332d] mb-4 flex items-center gap-2">
            <MessageCircle className="text-green-500" size={24} />
            How WhatsApp Booking Works
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Fill out the form above with your appointment details</li>
            <li>Click the "Send via WhatsApp" button</li>
            <li>WhatsApp will open with a pre-filled message containing your booking details</li>
            <li>Review the message and click the send button</li>
            <li>Our team will confirm your appointment shortly</li>
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
                We&apos;ve successfully received your appointment request.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}